const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
    preferences: { type: String, required: true },
    budget: { type: Number, required: true },
    skill: { type: String, required: true },
    time: { type: Number, required: true },
     mealPlan: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
