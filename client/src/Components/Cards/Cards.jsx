import React from 'react';
import { Link } from 'react-router-dom';
import '../Cards/Cards.css';
import DefaultImage from '../Cards/Autito.jpg';

const Card = ({ id, name, image, teams }) => {
  const fullName = `${name.forename} ${name.surname}`;
  const teamsString = Array.isArray(teams) ? teams.join(', ') : teams;

  return (
    <div className="card">
      <img src={image.url ? image.url : DefaultImage} alt={fullName} className="card-image" />
      <div className="card-content">
        <h3 className="card-name">{fullName}</h3>
        <p className="card-teams">Teams: {teamsString}</p>
        <Link to={`/drivers/${id}`} className="enter-button">View Details</Link>
      </div>
    </div>
  );
};

export default Card;