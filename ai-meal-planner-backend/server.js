const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const mealRoutes = require("./routes/mealRoutes");
const userInputRoutes = require("./routes/userInputRoutes");
const MealPlan = require("./models/MealPlan");
const mealPlanRoutes = require("./routes/mealPlanRoutes");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/meals", mealRoutes);

app.use("/api/mealplans", mealPlanRoutes);


// Use the userInputRoutes
app.use("/api/user", userInputRoutes);

app.get("/api/test", async (req, res) => {
    try {
        const mealPlans = await MealPlan.find(); // Fetch all meal plans
        res.status(200).json(mealPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use((req, res, next) => {
    // console.log(`Received request: ${req.method} ${req.url}`);
    next();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// console.log("from server.js file! OpenAI API Key:", process.env.OPENAI_API_KEY);

// console.log('My process.env', process.env)