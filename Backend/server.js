const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const recipentRoutes = require("./routes/recipentRoutes");
const cookieParser = require("cookie-parser");
const startExpirationCron = require("./cronJobs/expireMeal"); 
const { globalLimiter } = require("./Middlewares/rateLimiterMiddleware");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const server = createServer(app)

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend domain
    methods: ["GET", "POST"]
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(donorRoutes);
app.use(recipentRoutes);
app.use(globalLimiter)


io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Join private room for chat
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Handle message sending
  socket.on("sendMessage", ({ roomId, message }) => {
    // Broadcast to room only (except sender)
    socket.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const startServer = async () => {
  try {
    await connectDB();
    startExpirationCron();

    if (process.env.NODE_ENV === "production") {
      app.use(
        express.static(
          path.join(__dirname, "..", "Frontend", "food_donation", "dist")
        )
      );

      app.get("/", (req, res) => {
        res.sendFile(
          path.join(
            __dirname,
            "..",
            "Frontend",
            "food_donation",
            "dist",
            "index.html"
          )
        );
      });
    }

    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
