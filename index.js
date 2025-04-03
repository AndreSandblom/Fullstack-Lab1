require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const dishRoutes = require("./routes/dishRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_STRING, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("Connection do MongoDB sucess."))
    .catch((err) => console.error("Database connection error",err));

app.use("/api/dishes",dishRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Seriver running on ${PORT}`));
