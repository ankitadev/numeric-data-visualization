const express = require('express');
const  mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

const routes = require("./server/routes/dataRoutes");

/**
 * Get config from env file
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * Initialize mongoDB configs for mongo connection
 */
const ConnectMongoDB = require("./server/config/db");
ConnectMongoDB();

const mongoString = process.env.DATABASE_URL;
console.log(mongoString)
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, console.log(`server started on port ${PORT}`));