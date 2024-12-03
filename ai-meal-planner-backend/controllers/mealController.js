// "use server";
const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in your .env file
});

// Generate Meal Plan
const generateMealPlan = async (req, res) => {
  const { preferences, budget, skill, time } = req.body;

  // Construct the prompt for chat-based models
  const messages = [
    {
      role: "system",
      content:
        "You are a meal planning assistant. Respond with an easy to read, 3-day meal plan, including breakfast, lunch, and dinner for each day.",
    },
    {
      role: "user",
      content: `
        Create a meal plan for:
        - Preferences: ${preferences}
        - Budget: ${budget}
        - Skill: ${skill}
        - Time: ${time} minutes/meal
        Respond in an easy to read format that begins with
        "Here is a 3-day meal plan for a (Dietary Preference) with a/an (skill) skill level, looking to budget $(budget) for 3 days of (time)-minute meals:"
        Also please do not use ** or any other markdown syntax. It should only consist of the Day, the indented list of meals with a dash before them for that day, and the total cost for that day in parentheses with $ before the number. Also the total for each day and the total for all three days at the end.
        If the budget is relatively high (over $50), you can include more expensive ingredients, but the overall total for the 3 days should be less than or equal to the (budget). If the budget is low, you should include cheaper ingredients. If the skill is high, you can include more complex recipes. If the skill is low, you should include simpler recipes.
        `,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with "gpt-4" once we have access
      messages: messages,
      max_tokens: 300,
    });

    res
      .status(200)
      .json({ mealPlan: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error generating meal plan:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateMealPlan };
