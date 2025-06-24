import React from 'react';
import './Services.css';  // Ensure your CSS file has the correct styles
import parkingImage from './assets/parking.jpg'; // Use relative path correctly

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-left">
        <h1>SharedMiles</h1>
        <button className="ride-button">Find a ride</button>
        <button className="ride-button">Offer a ride</button>
      </div>
      <div className="services-right">
        <img src={parkingImage} alt="Parking" />
      </div>
    </div>
  );
}

export default Services;

