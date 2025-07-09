const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://localhost:27017/Login")

// Check if database is connected
connect.then(() => {
    console.log("✅ Database Connected Successfully");
}).catch((err) => {
    console.error("❌ Database Connection Error:", err);
});

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // mobile: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true
    }
});

// Collection (Model)
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
