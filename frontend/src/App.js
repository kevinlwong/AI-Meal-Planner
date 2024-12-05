import React, { useEffect, useState } from "react";
import logo from "./assets/planyourplate.jpg";

function App() {
  const [mealPlan, setMealPlan] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get the stored theme from localStorage or default to light
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme); // Set the initial theme
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage

    // Update the root class on the document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const [formData, setFormData] = useState({
    preferences: "",
    budget: "",
    skill: "",
    time: "",
    days: "",
  });

  // Handle form submission
  // https://meal-planner-backend-092b.onrender.com/api/meals/generate
  //http://localhost:5000/api/meals/generate
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://meal-planner-backend-092b.onrender.com/api/meals/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setMealPlan(data.mealPlan);

      const savePayload = {
        preferences: formData.preferences,
        budget: formData.budget,
        skill: formData.skill,
        time: formData.time,
        days: formData.days,
        mealPlan: data.mealPlan, // Generated plan from the API
      };

      console.log("Save Request Payload:", savePayload); // Debug save payload

      // const saveResponse = await fetch("https://meal-planner-backend-092b.onrender.com/api/mealplans/save", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(savePayload),
      // });
      // const savedData = await saveResponse.json();
      // console.log("Saved Meal Plan:", savedData);

      // alert("Meal plan saved successfully!");
    } catch (error) {
      console.error("Error generating meal plan:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center transition-colors duration-300">
      <div className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full transition-colors duration-300">
        <img
          src={logo}
          alt="PlanYourPlate Logo"
          className="h-[80px] w-[80px] rounded-sm ml-36"
        />
        <h1 className="text-4xl text-center font-bold mb-6 text-yellow-600">
          PlanYourPlate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Dietary Preferences (e.g., vegetarian, paleo)"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring focus:ring-yellow-500 focus:outline-none transition-colors duration-300"
          />
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Total Budget ($)"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring focus:ring-yellow-500 focus:outline-none transition-colors duration-300"
          />
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Cooking Skill (e.g., beginner, advanced)"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring focus:ring-yellow-500 focus:outline-none transition-colors duration-300"
          />
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time Per Meal (minutes)"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring focus:ring-yellow-500 focus:outline-none transition-colors duration-300"
          />
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="# of Days Needed (e.g., 3)"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:ring focus:ring-yellow-500 focus:outline-none transition-colors duration-300"
          />
          <button
            type="submit"
            className="font-medium w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500"
          >
            Generate Meal Plan
          </button>
        </form>

        {mealPlan && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              Your Meal Plan:
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {mealPlan}
            </p>
          </div>
        )}

        <p className="text-center text-gray-700 dark:text-gray-300 mt-8 transition-colors duration-300">
          Made by {""}
          <a
            href="https://kevinlwong.github.io/KevinLWong-Portfolio/"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-600"
          >
            Kevin Wong
          </a>
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">
          {""}
          <a
            href="https://www.linkedin.com/in/kevinlwong88/"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-600"
          >
            LinkedIn
          </a>
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">
          {""}
          <a
            href="https://github.com/kevinlwong"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-600"
          >
            Github
          </a>
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">
          Feel free to fork this {""}
          <a
            href="https://github.com/kevinlwong/AI-Meal-Planner"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-600"
          >
            repository
          </a>
        </p>

        <div className="text-center">
          <button
            className="mt-10 px-6 py-3 font-bold bg-yellow-600 text-gray-100 dark:bg-yellow-600 dark:text-white rounded hover:bg-yellow-500 dark:hover:bg-yellow-500 transition-colors duration-300"
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
