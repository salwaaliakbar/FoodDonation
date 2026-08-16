require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const recipentRoutes = require("./routes/recipentRoutes");
const cookieParser = require("cookie-parser");
const startExpirationCron = require("./cronJobs/expireMeal");
const { globalLimiter } = require("./Middlewares/rateLimiterMiddleware");
const { Server } = require("socket.io");
const { createServer } = require("http");
const messageSchema = require("./Models/messageModel");
const messageCron = require("./cronJobs/messagesCron");

const REQUIRED_ENV_VARS = [
  "MONGO_URI",
  "JWT_SECRET",
  "REFRESH_SECRET",
  "CLIENT_URL",
];

const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingEnvVars.length) {
  console.error(
    `Missing required environment variable(s): ${missingEnvVars.join(", ")}`
  );
  process.exit(1);
}

// Comma-separated list of extra allowed origins (staging/preview URLs, etc.)
// in addition to CLIENT_URL, e.g. "https://staging.example.com,https://preview.example.com"
const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.ADDITIONAL_ORIGINS
    ? process.env.ADDITIONAL_ORIGINS.split(",").map((origin) => origin.trim())
    : []),
].filter(Boolean);

function isOriginAllowed(origin) {
  // Requests with no origin (server-to-server calls, curl, health checks) are allowed.
  if (!origin) return true;
  return allowedOrigins.includes(origin);
}

const app = express();
const server = createServer(app);

// Render (and most PaaS providers) sit behind a reverse proxy — this is
// required for express-rate-limit to read the real client IP and for
// req.secure / secure cookies to work correctly.
app.set("trust proxy", 1);

app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// send io instance to the routes
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting must run before the routes it's meant to protect.
app.use(globalLimiter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(authRoutes);
app.use(donorRoutes);
app.use(recipentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Centralized error handler — keeps internal error details out of responses.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    error: err.publicMessage || "Server error",
  });
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Join private room for applied meal/ notify donor
  socket.on("joinNotificationRoom", async (userId) => {
    socket.join(userId);
  });

  // Join private room for chat
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    const messages = await messageSchema.find({ roomId }).sort({ createdAt: 1 });
    io.to(roomId).emit("loadPreviousMessages", messages);
  });

  // Handle message sending
  socket.on("sendMessage", async ({ roomId, message }) => {
    // Broadcast to room only (except sender)
    socket.to(roomId).emit("receiveMessage", message);

    await messageSchema.create({
      senderId: message.senderId,
      receiverId: message.receiverId,
      roomId,
      text: message.text,
      time: message.time,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    startExpirationCron();
    messageCron();

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
  // Force-exit if graceful shutdown hangs.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
