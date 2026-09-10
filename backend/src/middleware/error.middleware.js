// Centralized error handler. Any error passed to next(err), or thrown
// inside an async route wrapped with asyncHandler, ends up here -
// so individual routes don't each need their own try/catch boilerplate.
function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose "CastError" usually means a malformed :id in the URL
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server",
  });
}

// Wraps an async route handler so thrown errors/rejected promises
// are forwarded to errorHandler instead of crashing the process.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { errorHandler, asyncHandler };
