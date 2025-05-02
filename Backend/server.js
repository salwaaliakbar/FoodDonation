const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes")
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // Allow the frontend to access the backend
  credentials: true                 // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(donorRoutes)

const startServer = async () => {
  try {
    await connectDB();
console.log('chk2')
    // If you're in production, serve the static frontend build files
    if (process.env.NODE_ENV === "production") {
      console.log('chk1')
      app.use(express.static(path.join(__dirname, "..", "Frontend", "food_donation", "dist")));
      
      // Serve the index.html for all routes to enable client-side routing
      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "Frontend", "food_donation", "dist", "index.html"));
      });
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
