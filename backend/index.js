const express = require('express');
const connectDB = require('./connect');
const app = express()
const PORT = 4000
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config()
const MONGODB_URL = process.env.MONGODB_URL

const cors = require('cors');  

app.use(cors({
    origin: 'http://localhost:3000',  // frontend origin
  }));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/' , (req , res ) => {
  res.send("Server is running")
})

connectDB(MONGODB_URL)

app.use('/api', bookingRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))