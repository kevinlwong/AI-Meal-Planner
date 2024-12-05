const MealForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4 p-4">
    <input
      type="text"
      name="preferences"
      placeholder="Preferences (e.g., vegetarian)"
      className="border p-2 w-full"
    />
    <input
      type="number"
      name="budget"
      placeholder="Budget ($)"
      className="border p-2 w-full"
    />
    <input
      type="text"
      name="skill"
      placeholder="Cooking Skill (e.g., beginner)"
      className="border p-2 w-full"
    />
    <input
      type="number"
      name="time"
      placeholder="Time per meal (mins)"
      className="border p-2 w-full"
    />
    <input
      type="number"
      name="days"
      placeholder="# of Days Needed (e.g., 3)"
      className="w-full p-2 border rounded"
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Generate Meal Plan
    </button>
  </form>
);

export default MealForm;
