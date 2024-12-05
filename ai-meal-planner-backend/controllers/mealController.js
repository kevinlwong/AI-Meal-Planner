// "use server";
const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in your .env file
});

// Generate Meal Plan
const generateMealPlan = async (req, res) => {
  const { preferences, budget, skill, time, days } = req.body;
  const perDayBudget = budget / days;
  // Construct the prompt for chat-based models
  const messages = [
    {
      role: "system",
      content:
        "You are a highly knowledgeable and professional meal planning assistant. Respond with an easy to read, meal plan that accounts for the number of days requested by the user, including breakfast, lunch, and dinner for each day. Please be courteous to the user's preferences, budget, cooking skill level, and time constraints. Ensure that the total cost for each day is strictly less than or equal to the budget divided by the number of days. If the budget is relatively high, you can include more expensive ingredients, but the overall total for the days should be strictly less than or equal to the total budget given by the user. If the budget is low, you should include cheaper ingredients. If the skill is high, advanced, or professional you can include more complex recipes. If the skill is low, beginner, or medium you should include simpler recipes.",
    },
    {
      role: "user",
      content: `
        Create a detailed meal plan for:
        - Preferences: ${preferences}
        - Budget: ${budget}
        - Skill: ${skill}
        - Time: ${time} minutes/meal
        - Days: ${days} # of days for meal plans 
        - Per-Day Budget: $${perDayBudget}
        Respond in an easy to read format that begins with
        "Here is a (days)-day meal plan for a (Dietary Preference) with a/an (skill) skill level, looking to budget a total of $(budget) spread across (day) days of (time)-minute meals:" and there should be a new line after the colon.
        Ensure each day's total cost is strictly less than or equal to $${perDayBudget}.
        The overall total must not exceed $${budget}.
        Also please do not use ** or any other markdown syntax. It should only consist of the Day, the indented list of meals with a dash before them for that day, and the total cost for that day in parentheses with $ before the number. Also the total for each day and the total for all (day) days at the end.
        If the budget is relatively high (over $50 per day), you can include more expensive ingredients, but the overall total for the (day) days should be strictly less than or equal to the total $(budget) given by the user. 
        Please ensure that the total cost for each day is strictly less than or equal to the budget divided by the number of days.
        If the budget is low, you should include cheaper ingredients. If the skill is high, advanced, or professional you can include more complex recipes. If the skill is low, beginner, or medium you should include simpler recipes.
        Also, please reccomend popular websites for recipes that cover the meals that you suggest.
        End the message with "Enjoy your meals! \nIf you are not satisfied with the meal plan, please regenerate a new meal plan so I can cater better to your needs."
        `,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with "gpt-4" once we have access
      messages: messages,
      max_tokens: 1000,
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
