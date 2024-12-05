const express = require("express");
const UserInput = require("../models/UserInput"); // Import the UserInput model

const router = express.Router();

// POST route to save user input
router.post("/save", async (req, res) => {
    const { preferences, budget, skill, time, days } = req.body;

    try {
        // Validate that required fields are provided
        if (!preferences || !budget || !skill || !time || !days) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new UserInput document
        const userInput = new UserInput({ preferences, budget, skill, time, days });

        // Save to the database
        const savedInput = await userInput.save();

        // Respond with the saved document
        res.status(201).json(savedInput);
    } catch (error) {
        console.error("Error saving user input:", error);
        res.status(500).json({ message: "Server error. Could not save user input." });
    }
});

module.exports = router;
