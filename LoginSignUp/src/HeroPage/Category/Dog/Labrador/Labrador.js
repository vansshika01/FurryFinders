const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB connection to Sellers DB
mongoose.connect('mongodb+srv://rjhajharia2704:Vk6VBPmEb6MIKwVc@cluster0.4wflees.mongodb.net/Sellers?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Sellers DB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define schema for pets collection
const petSchema = new mongoose.Schema({
    full_name: String,
    mobile: String,
    email: String,
    location: String,
    state: String,
    district: String,
    pin_code: String,
    pet_type: String,
    breed: String,
    age: Number,
    price: Number,
    description: String,
    vaccination_docs: String,
    additional_docs: String,
    pet_images: [String]
}, { collection: 'pets' }); // 👈 collection name set to pets

const Pet = mongoose.model('Pet', petSchema);

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Labrador .html'));
});

// API endpoint to get pet data
// app.get('/api/users', async (req, res) => {
//     try {
//         const pets = await Pet.find({});
//         res.json(pets);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch pets' });
//     }
// });
app.get('/api/users', async (req, res) => {
    try {
        const pets = await Pet.find({ breed: "German Shepherd" });
        res.json(pets);
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ error: 'Failed to fetch pets' });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
