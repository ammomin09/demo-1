// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    error: message,
  });
};

// 404 handler
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
};
