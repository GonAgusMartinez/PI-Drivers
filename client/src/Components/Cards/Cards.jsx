import React from 'react';
import { Link } from 'react-router-dom';
import '../Cards/Cards.css';
import DefaultImage from '../Cards/Autito.jpg';

const Card = ({ id, name, image, teams, description }) => {
  if (!name || !teams) {
    return null;
  }

  const fullName = name.forename && name.surname ? `${name.forename} ${name.surname}` : name.forename || name.surname || 'Unknown';

  const teamsString = Array.isArray(teams) ? teams.join(', ') : teams;

  const imageUrl = image && image.url ? image.url : DefaultImage;

  return (
    <div className="card">
      <img src={imageUrl} alt={fullName} className="card-image" />
      <div className="card-content">
        <h3 className="card-name">{fullName}</h3>
        <p className="card-teams">Teams: {teamsString}</p>
        {description && <p className="card-description">{description}</p>}
        <Link to={`/drivers/${id}`} className="enter-button">View Details</Link>
      </div>
    </div>
  );
};

export default Card;