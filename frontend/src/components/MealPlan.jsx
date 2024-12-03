const MealPlan = ({ plan }) => (
    <div className="p-4 border rounded">
        <h3 className="text-lg font-bold">Your Meal Plan</h3>
        <pre>{plan}</pre>
    </div>
);

export default MealPlan;
