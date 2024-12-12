const connectToDatabase = require('./db');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");


const app = express();

connectToDatabase();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//route
app.get('/', (req, res) => {
    res.send('Backend är igång');
});

app.get('/data', (req, res) => {
    res.json({ message: 'Detta är data från backend' });
  });

//Starta route
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server är igång på port ${PORT}`));
