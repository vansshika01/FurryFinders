const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'HeroPage')));
app.use(express.static("public"));

app.set("view engine", "ejs");


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


app.get("/", (req, res) => {
    res.render("login")
});

app.get("/signup", (req,res) => {
    res.render("signup")
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });

        if (!check) {
            return res.send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (!isPasswordMatch) {
            return res.send("Wrong Password");
        }

        // ✅ Correct URL for static file access
        res.redirect("/index1.html");

    } catch (error) {
        console.error("Login Error:", error);
        res.send("An error occurred during login.");
    }
});



app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            password: req.body.password
        };

        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword; // Replace the original password with the hashed one

            await collection.insertMany(data);
            console.log("User registered successfully!");

            // ✅ Redirect to login page after successful signup
            res.redirect("/");  // Redirect to login page
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.send("Error occurred during signup.");
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})