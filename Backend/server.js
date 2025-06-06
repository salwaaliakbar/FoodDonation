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

const app = express();

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter)
app.use(authRoutes);
app.use(donorRoutes);
app.use(recipentRoutes);

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
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
