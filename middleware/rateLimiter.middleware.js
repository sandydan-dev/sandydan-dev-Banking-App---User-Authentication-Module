const rateLimite = require("express-rate-limit");

const ratelimiter = rateLimite({
  window: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    status: 429,
    error: "too many request",
    message: "You have exceeded the rate limite, please try after some time",
  },
  handler: (req, res, next, options) => {
    // custom error
    res.status(options.message.status).json({
      error: options.message.error,
      message: options.message.message,
      retryAfter: `15 minutes`,
    });
  },
});

module.exports = { ratelimiter };
