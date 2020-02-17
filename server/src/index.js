const express = require('express');

// Middleware
const morgan = require('morgan'); // Logger that logs all incomming requests
const helmet = require('helmet'); // Automatically adjust Headers for Security
const cors = require('cors'); // Cross Orignin Ressource Sharing Header --> Any Oringin can request form our Backend



const port = process.env.PORT || 3000



const app = express();
app.use(morgan('common')); // Logging every single requests
app.use(helmet()); // Securing Headers 
app.use(cors({
  origin: 'http://localhost:3000' // Only requests from here can request from our browser
}));


// Basic Routes, JSON App, response with JSON Objects
app.get('/', (req, res) => {
  res.send({
    message: "Hello World",
  })
})



// Creates not Found Error
// Sets statuscode 404
app.use((req, res, next) => {
  const error = new Error(`Not Found - §{req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  // if we make it here statusCode is 404 - if it is 200 some other route error occured
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Untraceable' : error.stack,
  })
});



app.listen(port, () => {
  console.log(`Server up and running... http://localhost:${port}`);
})