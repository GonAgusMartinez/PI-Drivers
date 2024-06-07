import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Detailpage/Detailpage.css';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';

const DetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        dispatch(setDriverDetail(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching driver:', error);
        setLoading(false);
      }
    };
  
    fetchDriver();
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (!driver) {
    return <p>Driver not found</p>;
  }

  return (
    <div className="detail-page">
      <h1>{`${driver.name.forename} ${driver.name.surname}`}</h1>
      <div className="driver-details">
        <img src={driver.image.url} alt={`${driver.name.forename} ${driver.name.surname}`} className="driver-image" />
        <div className="driver-info">
          <p><strong>ID:</strong> {driver.id}</p>
          <p><strong>Name:</strong> {driver.name.forename} {driver.name.surname}</p>
          <p><strong>Nationality:</strong> {driver.nationality}</p>
          <p><strong>Date of Birth:</strong> {driver.dob}</p>
          <p><strong>Teams:</strong> {driver.teams}</p>
          <p><strong>Description:</strong> {driver.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;