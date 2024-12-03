const express = require("express");
const MealPlan = require("../models/MealPlan"); // Import the MealPlan model

const router = express.Router();

// POST route to save the meal plan
router.post("/save", async (req, res) => {
    const { preferences, budget, skill, time, mealPlan } = req.body;

    try {
        // Validate required fields
        if (!preferences || !budget || !skill || !time || !mealPlan) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new MealPlan document
        const newMealPlan = new MealPlan({
            preferences,
            budget,
            skill,
            time,
            mealPlan,
        });

        // Save to the database
        const savedMealPlan = await newMealPlan.save();

        // Respond with the saved document
        res.status(201).json(savedMealPlan);
    } catch (error) {
        console.error("Error saving meal plan:", error);
        res.status(500).json({ message: "Server error. Could not save meal plan." });
    }
});


// Route to fetch all saved meal plans
router.get("/get-all", async (req, res) => {
    try {
        // Fetch all meal plans
        const mealPlans = await MealPlan.find(); // You can filter by userId if needed
        res.status(200).json(mealPlans);
    } catch (error) {
        console.error("Error fetching meal plans:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
