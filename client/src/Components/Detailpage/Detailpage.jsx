import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverDetail } from '../../actions/index'; 
import Loader from '../Loader/Loader';
import DefaultImage from '../Detailpage/Autito.jpg';
import '../Detailpage/Detailpage.css'; 

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { driverDetail: driver, loading } = useSelector(state => state.driverState);

  useEffect(() => {
    dispatch(fetchDriverDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (!driver) {
    return <p>Driver not found</p>;
  }

  // Función para obtener el nombre completo del conductor
  const getFullName = () => `${driver.name.forename} ${driver.name.surname}`;

  // Función para obtener los nombres de los equipos
  const getTeams = () => Array.isArray(driver.teams) ? driver.teams.join(', ') : driver.teams;

  return (
    <div className="detail-page">
      <div className="content">
        <h1>{getFullName()}</h1>
        <div className="driver-details">
          <img src={driver.image?.url || DefaultImage} alt={getFullName()} className="driver-image" />
          <div className="driver-info">
            <p><strong>ID:</strong> {driver.id}</p>
            <p><strong>Name:</strong> {getFullName()}</p>
            <p><strong>Nationality:</strong> {driver.nationality}</p>
            <p><strong>Date of Birth:</strong> {driver.dob}</p>
            <p><strong>Teams:</strong> {getTeams()}</p>
            <p><strong>Description:</strong> {driver.description}</p>
          </div>
        </div>
        <Link to="/home" className="back-button">Back</Link>
      </div>
    </div>
  );
};

export default DetailPage;