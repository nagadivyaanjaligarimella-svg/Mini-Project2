const express = require("express");
const mongoose = require("mongoose");
const hotelRoutes = require("./routes/hotelroutes");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hotelbooking")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/api/hotels", hotelRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Hotel Booking API Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});