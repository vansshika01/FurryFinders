const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// MongoDB Atlas Connection String
const uri = "mongodb+srv://rjhajharia2704:Vk6VBPmEb6MIKwVc@cluster0.4wflees.mongodb.net/";
const client = new MongoClient(uri);

const filePath = path.join(__dirname, "pets.json");

// Fetch and store data from MongoDB into pets.json
async function fetchAndStoreData() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const database = client.db("Sellers");
        const collection = database.collection("pets");

        // Fetch all documents from pets collection
        const data = await collection.find().toArray();

        // Write data to pets.json
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log("Data saved to pets.json");

        return filePath;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// API to manually update the JSON file
app.get("/update-json", async (req, res) => {
    await fetchAndStoreData();
    res.json({ message: "JSON file updated!", filePath });
});

// API to serve the pets.json file
app.get("/pets.json", (req, res) => {
    // Check if file exists before sending
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "JSON file not found. Please visit /update-json first." });
    }
});

// Enable CORS for frontend access
app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
