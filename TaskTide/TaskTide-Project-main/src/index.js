import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage"; // Import FirstPage component
import DashboardPage from "./components/DashboardPage"; // Import DashboardPage component
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TaskProvider>
      <Router>
        <Routes>
          {/* Route for FirstPage */}
          <Route path="/" element={<FirstPage />} />
          {/* Route for DashboardPage */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </TaskProvider>
  </React.StrictMode>
);
