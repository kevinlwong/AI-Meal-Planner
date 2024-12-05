import React, { useState } from "react";
import logo from "./assets/planyourplate.jpg";

function App() {
  const [mealPlan, setMealPlan] = useState(null);
  const [formData, setFormData] = useState({
    preferences: "",
    budget: "",
    skill: "",
    time: "",
    days: "",
  });

  // Handle form submission
  // https://meal-planner-backend-092b.onrender.com/api/meals/generate
  //https://localhost:5000/api/meals/generate
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-600 shadow-lg rounded-lg p-8 max-w-md w-full ">
        <img
          src={logo}
          alt="PlanYourPlate Logo"
          className="h-[80px] w-[80px] rounded-sm ml-36"
        />
        <h1 className="text-2xl text-center font-bold mb-6 text-yellow-600">
          PlanYourPlate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Dietary Preferences (e.g., vegetarian)"
            className="w-full p-2 border- rounded"
          />
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Total Budget ($)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Cooking Skill (e.g., beginner)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time Per Meal (mins)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="# of Days Needed (e.g., 3)"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500"
          >
            Generate Meal Plan
          </button>
        </form>

        {mealPlan && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-gray-300">
              Your Meal Plan:
            </h2>
            <p className="text-gray-300 whitespace-pre-wrap">{mealPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
