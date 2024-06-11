import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Info.css';
import Fotito from './Fotito.png';

const Info = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div className="info-container" style={{ backgroundColor: '#5BE6E1' }}>
        <div className="content-container">
          <h1 className="page-title">WoofWiki</h1>
          {showMore ? (
            <div className="personal-story">
              <p>
                Hi, I'm Gonzalo Agustin Martinez, and I want to share my story with Henry.
                At just 20 years old, I was determined to study programming in various areas, but I didn't know where specifically.
                Quite some time ago, while on a bus ride home, I had a conversation with a Henry graduate who explained to me how studying and working
                within the institution worked, and recommended that I start studying there even if I didn't have much knowledge in the field.
                That's how I discovered Henry and started with the prepcourse. Eventually, I managed to pass it and start my career.
                Nowadays, after passing various checkpoints (intermediate tests), I'm developing this website and looking forward to graduating and starting
                to work in this spectacular world where I excel, programming.
              </p>
            </div>
          ) : (
            <div className="page-description">
              <p>
                Main Features:
                Dog Breed Search: Use our search bar to find your favorite dogs. Filter by name, breed, and more.
                Detailed Information: Access detailed information about each dog, including details such as weight and height.
                Dog Breed Creation: You can add your own breeds to our database!
                Our mission is to provide a place where the breeding community can connect, explore new knowledge, and share their thoughts.
                So, what are you waiting for? Start your journey to explore this incredible world now! Feel free to join our community.
                Note: This page is under constant development, and we're excited to receive your feedback and suggestions to improve your experience.
              </p>
            </div>
          )}
          <button className="toggle-button" onClick={toggleShowMore}>
            {showMore ? 'About me' : 'About the page'}
          </button>
        </div>
        <img src={Fotito} alt="Fotito" className="fotito-image" />
        <Link to="/home" className="back-button">Back</Link>
      </div>
    </div>
  );
};

export default Info;