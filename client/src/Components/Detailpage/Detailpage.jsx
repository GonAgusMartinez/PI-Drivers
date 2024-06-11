import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader'; 
import './Detailpage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        setDog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dog details:', error);
        setError('Error fetching dog details. Please try again later.');
        setLoading(false);
      }
    };

    fetchDogDetails();
  }, [id]);

  if (loading) {
    return <Loader />; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dog) {
    return <div>No dog found.</div>;
  }

  return (
    <div className="detail-page">
      <h1>WoofWiki</h1>
      <h2>Dog Details</h2>
      <div>ID: {dog.id}</div>
      <div>Name: {dog.name}</div>
      <div>Height: {dog.height.metric} (metric), {dog.height.imperial} (imperial)</div>
      <div>Weight: {dog.weight.metric} (metric), {dog.weight.imperial} (imperial)</div>
      <div>Temperaments: {dog.temperament}</div>
      <div>Life Span: {dog.life_span}</div>
      <Link to="/home" className="button-link">Back</Link>
    </div>
  );
}

export default DetailPage;