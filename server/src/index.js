const express = require('express');

// Middleware
const morgan = require('morgan'); // Logger that logs all incomming requests
const helmet = require('helmet'); // Automatically adjust Headers for Security


const app = express();
app.use(morgan('common')); // Logging every single requests
app.use(helmet()); // Securing Headers

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server up and running... http://localhost:${port}`);
})