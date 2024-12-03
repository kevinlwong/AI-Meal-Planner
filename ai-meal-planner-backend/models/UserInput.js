const mongoose = require("mongoose");

const userInputSchema = new mongoose.Schema({
    preferences: { type: String, required: true }, // e.g., "keto"
    budget: { type: Number, required: true },      // e.g., 50 (USD)
    skill: { type: String, required: true },       // e.g., "beginner"
    time: { type: Number, required: true },        // e.g., 30 (minutes)
    createdAt: { type: Date, default: Date.now },  // Automatically store when the input is saved
});

module.exports = mongoose.model("UserInput", userInputSchema);
