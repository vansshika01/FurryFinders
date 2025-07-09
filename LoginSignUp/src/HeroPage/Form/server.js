const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3019;

// Body parser middleware to handle form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the form when you visit /post
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'HeroPage', 'Form', 'form.html'));
});

// MongoDB Atlas connection string
mongoose.connect('mongodb+srv://rjhajharia2704:Vk6VBPmEb6MIKwVc@cluster0.4wflees.mongodb.net/Sellers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Schema for pet adoption data
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
});

// Create a model from the schema
const Pet = mongoose.model('Pet', petSchema);

// Define the uploads directory path
const uploadDir = path.join(__dirname, 'src', 'HeroPage', 'Form', 'uploads');

// Ensure the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer file storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Naming the file with a timestamp
    }
});

// Initialize multer with file size limit and storage options
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
}).fields([
    { name: 'pet_images', maxCount: 5 }, // The 'pet_images' field should match the name attribute in HTML
    { name: 'vaccination_docs', maxCount: 1 },
    { name: 'additional_docs', maxCount: 1 }
]);

// Handle form submission at /post route
app.post('/post', upload, (req, res) => {
    const { full_name, mobile, email, location, state, district, pin_code, pet_type, breed, age, price, description } = req.body;

    const petImages = req.files.pet_images ? req.files.pet_images.map(file => file.path) : [];
    const vaccinationDocs = req.files.vaccination_docs ? req.files.vaccination_docs[0].path : null;
    const additionalDocs = req.files.additional_docs ? req.files.additional_docs[0].path : null;

    // Create a new pet entry
    const newPet = new Pet({
        full_name,
        mobile,
        email,
        location,
        state,
        district,
        pin_code,
        pet_type,
        breed,
        age,
        price,
        description,
        vaccination_docs: vaccinationDocs,
        additional_docs: additionalDocs,
        pet_images: petImages
    });

    // Save the pet entry to the database
    newPet.save().then(() => {
        // Sending success response along with the option to submit another form
        res.send(`
            <html>
                <head><title>Form Submission</title></head>
                <body>
                    <h1>Form Submitted Successfully!</h1>
                    <p>Your pet details have been saved to the database.</p>
                    <button onclick="window.location.href='/post'">Submit Another</button>
                </body>
            </html>
        `);
    }).catch((error) => {
        console.error('Error saving pet details:', error);
        res.status(500).send('An error occurred while submitting the form.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
