import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Landing from "./assets/landing.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to Login page when button is clicked
  };

  return (
    <div className="landing-page">
      {/* Header for the Landing Page */}
      <header className="landing-header">
        <div className="logo">
          <img src={require('./assets/1.png')} alt="Logo" style={{ width: '150px', height: 'auto' }} />
          
        </div>
        
        <nav className="landing-nav">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-section">
        <div className="text-content">
          <h2>Thinking of sharing your ride?</h2>
          <p>Over 100 users share rides daily. You can too!</p>
          <div className="buttons">
            <button className="login-btn" onClick={handleLoginClick}>GET STARTED!</button>
          </div>
        </div>
        <div className="image-content">
          <img src={Landing} alt="Ride sharing illustration" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
