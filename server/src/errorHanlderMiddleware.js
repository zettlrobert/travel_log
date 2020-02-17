// Not Found Error Handler
// Sets statuscode 404
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


// General error handling middleware
const errorHandler = (error, req, res, next) => {
  // if we make it here statusCode is 404 - if it is 200 some other route error occured
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Untraceable' : error.stack,
  })
};


module.exports = {
  notFound,
  errorHandler,
};