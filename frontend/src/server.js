
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/yourDatabaseName'; // Replace with your connection string
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        // You can now interact with the database using client.db()
        const db = client.db();
        // Example: const collection = db.collection('yourCollectionName');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectDB();
