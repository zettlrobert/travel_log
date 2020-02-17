//Envoirment Variables
const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/database');

dotenv.config({
  path: `${__dirname}/config/config.env`
})


// Middleware
const morgan = require('morgan'); // Logger that logs all incomming requests
const helmet = require('helmet'); // Automatically adjust Headers for Security
const cors = require('cors'); // Cross Orignin Ressource Sharing Header --> Any Oringin can request form our Backend

// Importing Routes
const logs = require('./API/logs');


const errorHandling = require('./errorHanlderMiddleware'); // My Error Handlers

// connect to DB
connectDB();

const port = process.env.PORT || 3000;


const app = express();
app.use(morgan('common')); // Logging every single requests
app.use(helmet()); // Securing Headers 
app.use(cors({
  origin: process.env.CORS_ORIGIN // Only requests from here can request from our browser
}));


// JSON Body Parsing Middleware
app.use(express.json()); // pody parser is bundled with express now


// Basic Routes, JSON App, response with JSON Objects
app.get('/', (req, res) => {
  res.send({
    message: "Hello World",
  })
})



//Routes
app.use('/api/logs', logs);



app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler)


app.listen(port, () => {
  console.log(`Server up and running... http://localhost:${port}`);
})