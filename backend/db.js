// require('dotenv').config();
// const { MongoClient } = require("mongodb");

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri);
// console.log("Mongo URI:", uri);

// async function connectToDatabase() {
  
//   try {
//     // Connect the client to the server
//     await client.connect();
//     console.log("Ansluten till databasen!");

//     const db = client.db(process.env.MONGO_DB);

//     // Send a ping to confirm a successful connection
//     await db.command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (err) {
//         console.error("Misslyckades att ansluta till databasen:", err);
//     } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// module.exports = connectToDatabase;