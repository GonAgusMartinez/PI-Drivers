import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Landingpage/Landingpage.css'; 

const Landingpage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to WoofWiki</h1>
        <p>Find your perfect canine companion!</p>
        <Link to="/home">
          <button className="enter-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingpage;