import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS for global styles
import App from './App'; // Your main App component
import reportWebVitals from './reportWebVitals'; // Performance monitoring

// Create root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance measurement
reportWebVitals();