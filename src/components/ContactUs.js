import React from 'react';
import './ContactUs.css';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import image from './assets/bg.jpg';

const ContactUs = () => {
  return (
    <div className="contact-us" style={{ backgroundImage: `url(${image})` }}>
      <div className="contact-content">
        <h2>Contact Us! :D</h2>
        <div className="contact-item">
          <a href="https://www.facebook.com/SharedMiles" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon" />
            <span>SharedMiles</span>
          </a>
        </div>
        <div className="contact-item">
          <a href="https://www.instagram.com/sharedmiles" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
            <span>sharedmiles</span>
          </a>
        </div>
        <div className="contact-item">
          <a href="https://www.youtube.com/channel/sharedmiles" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="icon" />
            <span>SharedMiles</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
