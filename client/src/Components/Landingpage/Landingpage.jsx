import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Landingpage/Landingpage.css'; 

const Landingpage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to DriversCup</h1>
        <p>Find your inner driver!</p>
        <Link to="/home">
          <button className="enter-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingpage;