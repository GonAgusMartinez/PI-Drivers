import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverDetail } from '../../actions/Index'; 
import Loader from '../Loader/Loader';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.driverDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        await dispatch(fetchDriverDetail(id));
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
          <p><strong>Name:</strong> {`${driver.name.forename} ${driver.name.surname}`}</p>
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