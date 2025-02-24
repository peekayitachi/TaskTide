import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './FirstPage.css';

const FirstPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleGetStarted = () => {
    navigate('/dashboard'); // Redirect to DashboardPage
  };

  return (
    <div className="first-page">
      <div className="content">
        <h1>Welcome to TaskTide</h1>
        <p>
          Your ultimate solution to organize your thoughts and tasks in one
          place. Create journal entries and manage your work effortlessly.
        </p>
        <div className="buttons">
          <button className="btn get-started" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
      <div className="graphics">
      <img src="/deer.jpeg" alt="Graphics" />
      </div>
    </div>
  );
};

export default FirstPage;
