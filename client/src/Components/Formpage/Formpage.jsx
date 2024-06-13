import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Formpage.css';
import MaxImage from './Maxverstappen.png';

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <option value="Mercedes">Mercedes</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Red Bull Racing">Red Bull Racing</option>
          </select>
          <button type="submit" className="create-button">Create Driver</button>
          <Link to="/home" className="back-button">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default FormPage;