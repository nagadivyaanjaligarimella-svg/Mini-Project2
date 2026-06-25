const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

// Create Hotel
router.post("/", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();

    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Hotel By ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Hotel
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Hotel
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;