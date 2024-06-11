import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css'; 


const Cards = ({ dogs }) => {
  return (
    <div className="cards-container">
      {dogs.map((dog) => (
        <div key={dog.id} className="card-container">
          <img src={dog.image && dog.image.url} alt={dog.name} className="card-image" />
          <div className="card-content">
            <h2 className="card-name">{dog.name}</h2>
            <p className="card-details">
              <strong>Temperaments:</strong> {dog.temperament}<br />
              <strong>Weight:</strong> {dog.weight.metric} (metric), {dog.weight.imperial} (imperial)<br />
              <strong>Life Span:</strong> {dog.life_span}<br />
              <strong>Height:</strong> {dog.height.metric} (metric), {dog.height.imperial} (imperial)<br />
            </p>
            <Link to={`/dogs/${dog.id}`} className="card-link">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;