import React from 'react';
import './AboutUs.css';
import johnImage from './assets/john.jpg';
import janeImage from './assets/jane.jpg';
import emilyImage from './assets/emily.jpg';
import michaelImage from './assets/michael.jpg';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <p>
                Welcome to Shared Miles! We are dedicated to making your commute easier, more affordable, and eco-friendly. 
                Our mission is to provide a reliable and safe carpooling experience that connects people headed in the same direction, 
                reducing traffic, saving costs, and lowering carbon emissions along the way.
            </p>
            <h2>Our Story</h2>
            <p>
                Our journey began with a commitment to improving the daily commute and making travel more sustainable. 
                We believe in the power of shared transportation to positively impact our environment and communities. 
                By connecting drivers and riders, we help reduce the number of cars on the road and promote greener, more efficient travel.
                
            </p>
            <h2>Why Choose Us</h2>
            <ul>
                <li>Affordable and flexible carpooling options for all types of commuters</li>
                <li>Easy-to-use app that connects you with trusted drivers and passengers</li>
                <li>Eco-friendly approach to reduce traffic and emissions</li>
                <li>Commitment to safety, security, and community-building</li>
            </ul>
            <p>
                Thank you for choosing Shared Miles as your carpooling partner. Together, we're building a more connected, sustainable future 
                for daily commuting and long-distance travel!
            </p>

            {/* Team Section */}
            <h2>Meet Our Team</h2>
            <div className="team-members">
                <div className="team-member">
                    <img src={johnImage} alt="John Doe" className="team-member-image" />
                    <h3>Tanmay Gupta</h3>
                    <p>Founder & CEO</p>
                </div>
                <div className="team-member">
                    <img src={janeImage} alt="Jane Smith" className="team-member-image" />
                    <h3>Kennice Gonalves</h3>
                    <p>Head of Operations</p>
                </div>
                <div className="team-member">
                    <img src={emilyImage} alt="Emily Brown" className="team-member-image" />
                    <h3>Jeslyn Gonsalves</h3>
                    <p>Marketing Director</p>
                </div>
                <div className="team-member">
                    <img src={michaelImage} alt="Michael Lee" className="team-member-image" />
                    <h3>Om Gaikwad</h3>
                    <p>Operations Manager</p>
                </div>
                
            </div>
        </div>
    );
}

export default AboutUs;
