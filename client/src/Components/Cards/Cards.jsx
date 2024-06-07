import React from 'react';
import { Link } from 'react-router-dom';
import '../Cards/Cards.css';

const Card = ({ id, name, image, teams }) => {
  return (
    <Link to={`/drivers/${id}`} className="card">
      <img src={image} alt={`${name}`} className="card-image" />
      <div className="card-content">
        <h3 className="card-name">{name}</h3>
        <p className="card-teams">Teams: {teams.join(', ')}</p>
      </div>
    </Link>
  );
};

export default Card;