const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static(__dirname)); 

const dishRoutes = require("./routes/dishRoutes");
app.use("/api/dishes",dishRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

mongoose.connect(process.env.MONGO_STRING)
    .then(() => {
        console.log("Connection do MongoDB success.")

        const PORT = process.env.PORT || 5055;
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => {
        console.error("Database connection error",err);
    });
