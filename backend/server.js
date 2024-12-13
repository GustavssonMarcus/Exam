require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Hämtar variabler från .env filen
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
  console.error("MONGO_URL är undefined. Kontrollera din .env-fil.");
  process.exit(1);
}
//Koppling mellan mongodb och vs code
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

//Hämtar data från mongodb
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

  const UserModel = mongoose.model("products", userSchema)

  app.get('/getProducts', async(req, res) => {
    const userData = await UserModel.find();
      res.json(userData);
    });

//route
app.get('/', (req, res) => {
    res.send('Backend är igång');
});