require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

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
    console.log("Ansluten till MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server är igång på port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Misslyckades att ansluta till MongoDB:", err.message);
    process.exit(1);
  });

//Hämtar data från mongodb
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  size: { type: [String], required: true, default: ["Standard"] },
  color: { type: [String], required: true, default: ["Default Color"] },
});

  const ProductModel = mongoose.model("Product", productSchema);

// API-routes
app.get('/getProducts', async (req, res) => {

    const products = await ProductModel.find();
    console.log("data", products)
    res.json(products);
  }
);

app.post('/addProduct', async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Fel vid skapande av produkt:", err);
    res.status(400).json({ error: "Kunde inte skapa produkt" });
  }
});

// Testroute
app.get('/', (req, res) => {
    res.send('Backend är igång');
});

app.use((req, res) => {
  res.status(404).json({ error: "Sidan kunde inte hittas" });
});