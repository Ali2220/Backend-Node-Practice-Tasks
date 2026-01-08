const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ❌ Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // ❌ Duplicate key error (email already exists)
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value entered";
  }

  // ❌ JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
