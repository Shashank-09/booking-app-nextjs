const express = require('express');
const connectDB = require('./connect');
const app = express()
const PORT = 4000
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config()
const Url = process.env.Url

const cors = require('cors');  

app.use(cors({
    origin: 'http://localhost:3000',  // frontend origin
  }));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// app.use((req, res) => {
//    res.send("Hello from server") 
// })

connectDB(Url)

app.use('/api', bookingRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))