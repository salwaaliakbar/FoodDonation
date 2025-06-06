const rateLimit = require("express-rate-limit");

const feedLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "You're sending too many requests. Please wait a moment and try again.",
    });
  },
});


const recipientLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 20, // allow 20 requests per IP
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "You're sending too many requests. Please wait a moment and try again.",
    });
  },
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200, // allow 200 requests per IP
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "You're sending too many requests. Please wait a moment and try again.",
    });
  },
});

module.exports = {
    feedLimiter,
    recipientLimiter,
    globalLimiter
};
