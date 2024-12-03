Here’s a detailed `README.md` file for your AI Meal Planner project, structured for GitHub:

---

# **AI Meal Planner**

## **Overview**
AI Meal Planner is a web application that generates personalized meal plans based on user preferences, budget, cooking skill level, and time constraints. The app integrates OpenAI’s GPT API to dynamically create meal plans and allows users to save and retrieve their plans using MongoDB.

This project demonstrates the use of AI in simplifying meal planning and offers a user-friendly interface built with React and Tailwind CSS, backed by a Node.js and Express.js API.

---

## **Features**
- **Personalized Meal Plans**: Generate meal plans tailored to dietary preferences (e.g., keto, vegetarian), budget, skill level, and available time.
- **Dynamic Recipe Generation**: Uses OpenAI GPT to create meal plans with varied breakfast, lunch, and dinner options.
- **Save and Retrieve Plans**: Stores meal plans in MongoDB for users to access them later.
- **Clean UI**: User-friendly interface built with React and styled with Tailwind CSS.
- **API Integration**: Robust backend using Node.js, Express.js, and OpenAI’s GPT API.

---

## **Tech Stack**
### **Frontend**
- **React**: Framework for building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Fetch API**: For making HTTP requests to the backend.

### **Backend**
- **Node.js**: Runtime environment for the backend server.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: Database for storing user inputs and generated meal plans.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

### **AI Integration**
- **OpenAI GPT**: Generates meal plans dynamically based on user inputs.

---

## **Setup and Installation**

### **Prerequisites**
Ensure the following are installed on your system:
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git
- OpenAI API Key

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-meal-planner.git
   cd ai-meal-planner/ai-meal-planner-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `ai-meal-planner-backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your-mongo-db-connection-string
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`.

---

## **How to Use**
1. **Generate a Meal Plan**:
   - Enter dietary preferences, budget, cooking skill level, and time per meal in the form.
   - Click **"Generate Meal Plan"** to dynamically create a 3-day plan.

2. **Save the Plan**:
   - The meal plan is automatically saved to MongoDB after generation.
   - Users are notified with a success message.

3. **Retrieve Past Plans**:
   - Click **"View Past Meal Plans"** to see a list of previously generated and saved plans.
   - Plans are displayed in a user-friendly format.

---

## **File Structure**
```
ai-meal-planner/
├── ai-meal-planner-backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   └── mealController.js    # Handles AI meal plan generation
│   ├── models/
│   │   └── MealPlan.js          # Mongoose schema for meal plans
│   ├── routes/
│   │   ├── mealRoutes.js        # Routes for generating meal plans
│   │   └── mealPlanRoutes.js    # Routes for saving and retrieving meal plans
│   ├── server.js                # Express server entry point
│   └── .env                     # Environment variables (ignored in Git)
├── frontend/
│   ├── src/
│   │   ├── components/          # React components (e.g., MealForm)
│   │   ├── App.js               # Main React app
│   │   └── index.js             # React entry point
│   └── tailwind.config.js       # Tailwind CSS configuration
├── README.md                    # Project documentation
├── .gitignore                   # Ignored files and directories
└── package.json                 # Dependency management
```

---

## **API Endpoints**
### **Generate Meal Plan**
**POST** `/api/meals/generate`
- **Request**:
  ```json
  {
    "preferences": "keto",
    "budget": 50,
    "skill": "beginner",
    "time": 30
  }
  ```
- **Response**:
  ```json
  {
    "mealPlan": {
      "day1": {
        "breakfast": "Scrambled eggs with spinach",
        "lunch": "Tuna salad with avocado",
        "dinner": "Grilled chicken with broccoli"
      },
      ...
    }
  }
  ```

### **Save Meal Plan**
**POST** `/api/mealplans/save`
- **Request**:
  ```json
  {
    "preferences": "keto",
    "budget": 50,
    "skill": "beginner",
    "time": 30,
    "mealPlan": {
      "day1": {...},
      "day2": {...},
      "day3": {...}
    }
  }
  ```

### **Retrieve Past Meal Plans**
**GET** `/api/mealplans/get-all`
- **Response**:
  ```json
  [
    {
      "_id": "64fbbb34...",
      "preferences": "keto",
      "budget": 50,
      "skill": "beginner",
      "time": 30,
      "mealPlan": {...}
    },
    ...
  ]
  ```

---

## **Future Improvements**
- Add user authentication to associate meal plans with specific users.
- Enhance AI-generated plans with nutritional information.
- Allow users to customize and modify meal plans after generation.
- Deploy the application using services like Vercel (frontend) and Heroku/AWS (backend).

---

## **Contributing**
Contributions are welcome! Feel free to submit a pull request or create an issue if you encounter a bug or have a feature request.
