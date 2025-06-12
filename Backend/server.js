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
const messageSchema = require("./Models/messageModel");
const messageCron = require("./cronJobs/messagesCron");

const app = express();
const server = createServer(app);

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
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

// send io instance to the routes
app.set("io", io)

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(donorRoutes);
app.use(recipentRoutes);
app.use(globalLimiter);

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

   // Join private room for applied meal/ notify donor
  socket.on("joinNotificationRoom",async (donorId) => {
    socket.join(donorId);
    console.log(`User ${donorId} joined notification room`);
  });

  // Join private room for chat
  socket.on("joinRoom",async (roomId) => {
    socket.join(roomId);
    const messages = await messageSchema.find({ roomId }).sort({ createdAt: 1 })
    socket.emit('loadPreviousMessages', messages)
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
const startServer = async () => {
  try {
    await connectDB();
    startExpirationCron();
    messageCron()

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
