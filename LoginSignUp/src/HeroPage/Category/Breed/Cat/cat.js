const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware to serve static files like images, frontend files, etc.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname)); // Serves index.html, cat.html, etc.

// MongoDB Atlas connection to 'Sellers' DB
mongoose.connect('mongodb+srv://rjhajharia2704:Vk6VBPmEb6MIKwVc@cluster0.4wflees.mongodb.net/Sellers?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Sellers DB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Schema and Model
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
}, { collection: 'pets' });

const Pet = mongoose.model('Pet', petSchema);

// Routes to serve HTML files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cat.html')); // Cat Breed Finder
});

// API route to fetch only dog data
app.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await Pet.find({ pet_type: 'dog' });
        res.json(dogs);
    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Failed to fetch dog data' });
    }
});

// API route to fetch only cat data
app.get('/api/cats', async (req, res) => {
    try {
        const cats = await Pet.find({ pet_type: 'cat' });
        res.json(cats);
    } catch (err) {
        console.error('Error fetching cats:', err);
        res.status(500).json({ error: 'Failed to fetch cat data' });
    }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
