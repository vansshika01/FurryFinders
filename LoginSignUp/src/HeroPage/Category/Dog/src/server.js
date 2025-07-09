const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware to serve static files (like images or uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname)); // to serve index.html and frontend files

// MongoDB Atlas connection to 'Sellers' DB
mongoose.connect('mongodb+srv://rjhajharia2704:Vk6VBPmEb6MIKwVc@cluster0.4wflees.mongodb.net/Sellers?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Sellers DB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Schema for pets collection
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

// Serve your HTML frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to return only dogs
app.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await Pet.find({ pet_type: 'dog' });
        res.json(dogs);
    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Failed to fetch dog data' });
    }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
