const express = require('express');

// Middleware
const morgan = require('morgan'); // Logger that logs all incomming requests
const helmet = require('helmet'); // Automatically adjust Headers for Security
const cors = require('cors'); // Cross Orignin Ressource Sharing Header --> Any Oringin can request form our Backend

const errorHandling = require('./errorHanlderMiddleware'); // My Error Handlers



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



app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler);


app.listen(port, () => {
  console.log(`Server up and running... http://localhost:${port}`);
})