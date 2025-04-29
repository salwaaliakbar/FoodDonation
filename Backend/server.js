const express = require("express");
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const appRoute = require('./routes/appRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appRoute)

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.use(express.static(path.join(__dirname, '..', 'Frontend/food_donation', 'dist')));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'Frontend/food_donation', 'dist', 'index.html'));
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();