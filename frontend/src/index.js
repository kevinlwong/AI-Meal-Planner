import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS styles
import App from './App';

// Create a root React element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
