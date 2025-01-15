require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Hämtar variabler från .env filen
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
  console.error("MONGO_URL är undefined. Kontrollera din .env-fil.");
  process.exit(1);
}
//Koppling mellan mongodb och vs code
mongoose.connect(MONGOURL)
  .then(async () => {
    console.log("Ansluten till MongoDB!");
    const updateSlugs = async () => {
      const products = await ProductModel.find();
      for (const product of products) {
        if (!product.slug) {
          product.slug = product.name.toLowerCase().replace(/[\s\W-]+/g, '-');
          await product.save();
        }
      }
      console.log("Alla slugs har uppdaterats!");
    };

    await updateSlugs();

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
  slug: { type: String, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  size: { type: [String], required: true, default: ["Standard"] },
  color: { type: [String], required: true, default: ["Default Color"] },
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[\s\W-]+/g, '-');
  }
  next();
});

  const ProductModel = mongoose.model("Product", productSchema);

// API-routes

//Skapar en checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Inga produkter tillhandahölls." });
    }

    const lineItems = products.map(product => {
      if (!product.name || !product.price || !product.quantity) {
        throw new Error("Alla produkter måste innehålla namn, pris och antal.");
      }

      return {
        price_data: {
          currency: 'sek',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ id: session.url });
  } catch (e) {
    console.error("Error creating checkout session:", e);
    res.status(500).json({ error: e.message });
  }
});
app.get('/success', (req, res) => {
  res.send('<h1>Betalningen lyckades! Tack för din beställning.</h1>');
});

app.get('/cancel', (req, res) => {
  res.send('<h1>Betalningen avbröts. Försök igen.</h1>');
});

//Hämta produkt baserat på Id
app.get('/product/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;

    // Hämta produkten baserat på slug
    const product = await ProductModel.findOne({ slug: productSlug });

    if (!product) {
      return res.status(404).json({ message: 'Produkten hittades inte.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error.message);
    res.status(500).json({ message: 'Ett serverfel inträffade.' });
  }
});

//Hämta produkter
app.get('/getProducts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await ProductModel.find().skip(skip).limit(limit);

    // Räkna totala antalet produkter i databasen
    const totalProducts = await ProductModel.countDocuments();
    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error.message);
    res.status(500).json({ message: 'Ett serverfel inträffade.' });
  }
});

//Filtrera produkterna efter type
app.get('/filterProducts', async (req, res) => {
  try {
    const { type } = req.query;

    let filter = {};
    if (type) {
      const types = Array.isArray(type) ? type : (typeof type === 'string' ? [type] : []);
      //console.log("Filtreringslista:", types);
      filter = { type: { $in: types } };
    }

    // Hämta och filtrera produkter baserat på 'type'
    const filteredProducts = await ProductModel.find(filter);
    res.json(filteredProducts);
  } catch (err) {
    console.error("Fel vid filtrering av produkter:", err);
    res.status(500).json({ error: "Kunde inte filtrera produkter" });
  }
});

// Testroute
app.get('/', (req, res) => {
    res.send('Backend är igång');
});
// Error route
app.use((req, res) => {
  res.status(404).json({ error: "Sidan kunde inte hittas" });
});