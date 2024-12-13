require('dotenv').config();

// const connectToDatabase = require('./db');

// const cors = require('cors');
// const bodyParser = require("body-parser");
//import express from "express";
//import mongoose from "mongoose";
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
  console.error("MONGO_URL är undefined. Kontrollera din .env-fil.");
  process.exit(1); // Avsluta processen om URI saknas
}

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server är igång på port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Misslyckades att ansluta till MongoDB:", err.message);
  });



// connectToDatabase();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

//route
app.get('/', (req, res) => {
    res.send('Backend är igång');
});

app.get('/data', (req, res) => {
    res.json({ message: 'Detta är data från backend' });
  });

//Starta route
// app.listen(PORT, () => console.log(`Server är igång på port ${PORT}`));
