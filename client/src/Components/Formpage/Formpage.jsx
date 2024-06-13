import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Formpage.css';
import MaxImage from './Maxverstappen.png';

const FormPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
  });

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/drivers');
        const data = response.data;

        // Utilizar un Set para equipos únicos
        const uniqueTeamsSet = new Set();
        data.forEach(driver => {
          if (driver.teams && typeof driver.teams === 'string') {
            // Dividir la cadena de equipos por comas y trim para eliminar espacios en blanco adicionales
            const teamsArray = driver.teams.split(',').map(team => team.trim());
            teamsArray.forEach(team => uniqueTeamsSet.add(team));
          } else {
            console.warn(`Driver ${driver.id} does not have valid teams data.`);
          }
        });

        // Convertir Set a un array y ordenar alfabéticamente
        const uniqueTeamsArray = Array.from(uniqueTeamsSet).sort();

        // Actualizar el estado con los equipos únicos
        setTeams(uniqueTeamsArray);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí podrías enviar los datos al servidor o realizar alguna acción adicional.
  };

  return (
    <div className="formpage-container">
      <div className="left-content">
        <img src={MaxImage} alt="Max Verstappen" className="max-image" />
      </div>
      <div className="right-content">
        <h2 className="form-title">Create New Driver</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label className="form-label">Nationality:</label>
          <input
            type="text"
            className="form-text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
          <label className="form-label">Image:</label>
          <input
            type="text"
            className="form-text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label className="form-label">Description:</label>
          <textarea
            className="form-text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <label className="form-label">Teams:</label>
          <select
            multiple
            className="form-text"
            name="teams"
            value={formData.teams}
            onChange={handleChange}
          >
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          
          <button type="submit" className="create-button">Create Driver</button>
          <Link to="/home" className="back-button">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default FormPage;