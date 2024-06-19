import React from 'react';
import { Link } from 'react-router-dom';
import '../Cards/Cards.css';
import DefaultImage from '../Cards/Autito.jpg';

const Card = ({ id, name, image, teams }) => {
  if (!name || !teams) {
    return null;
  }

  let fullName;
  if (name.forename && name.surname) {
    fullName = `${name.forename} ${name.surname}`;
  } else {
    fullName = `${name}`;
  }

  const teamsString = Array.isArray(teams) ? teams.join(', ') : teams;

  let imageUrl = image && image.url ? image.url : DefaultImage;

  return (
    <div className="card">
      <img src={imageUrl} alt={fullName} className="card-image" />
      <div className="card-content">
        <h3 className="card-name">{fullName}</h3>
        <p className="card-teams">Teams: {teamsString}</p>
        <Link to={`/drivers/${id}`} className="enter-button">View Details</Link>
      </div>
    </div>
  );
};

export default Card;