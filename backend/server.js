const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//route
app.get('/', (req, res) => {
    res.send('Backend är igång');
});

//Starta route
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server är igång på port ${PORT}`));
