import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Formpage/Formpage.css';
import perritoImage from '../Formpage/Perrito.png';
import axios from 'axios';

const FormPage = () => {
  const [formData, setFormData] = useState({
    height: {
      imperial: '',
      metric: ''
    },
    weight: {
      imperial: '',
      metric: ''
    },
    id: 0,
    name: '',
    life_span: '',
    temperaments: '',
    image: ''
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [temperamentOptions, setTemperamentOptions] = useState([]);
  const [lastId, setLastId] = useState(0);

  const handleAlert = () => {
    alert('Dog created successfully!');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs');
        const lastDog = response.data.reduce((maxId, dog) => Math.max(maxId, dog.id), 0);
        setLastId(lastDog + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTemperamentOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs');
        const uniqueTemperaments = response.data.reduce((temperaments, dog) => {
          if (dog.temperament) {
            const dogTemperaments = dog.temperament.split(',').map(t => t.trim());
            dogTemperaments.forEach(temperament => {
              if (!temperaments.includes(temperament)) {
                temperaments.push(temperament);
              }
            });
          }
          return temperaments;
        }, []);
        setTemperamentOptions(uniqueTemperaments);
      } catch (error) {
        console.error('Error fetching temperament options:', error);
      }
    };
    fetchTemperamentOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const imperialHeightPattern = /^[2-9]|[1-2][0-9]|[3][0-5]\s*-\s*[2-9]|[1-2][0-9]|[3][0-5]$/;
    const metricHeightPattern = /^3[5-9]|[4-9][0-9]|100\s*-\s*3[5-9]|[4-9][0-9]|100$/;
    const imperialWeightPattern = /^[2-9]|[1-2][0-9]|[3][0-5]\s*-\s*[2-9]|[1-2][0-9]|[3][0-5]$/;
    const metricWeightPattern = /^3[5-9]|[4-9][0-9]|100\s*-\s*3[5-9]|[4-9][0-9]|100$/;
    const namePattern = /^.{1,25}$/;
    const lifeSpanPattern = /^\d+\s*-\s*\d+\s*years$/;
    const temperamentPattern = /^(?:\s*\w+\s*(?:,\s*\w+\s*){0,5})?$/;
    const imageUrlPattern = /^(http|https):\/\/\S+$/;

    const isHeightImperialValid = imperialHeightPattern.test(formData.height.imperial);
    const isHeightMetricValid = metricHeightPattern.test(formData.height.metric);
    const isWeightImperialValid = imperialWeightPattern.test(formData.weight.imperial);
    const isWeightMetricValid = metricWeightPattern.test(formData.weight.metric);
    const isNameValid = namePattern.test(formData.name);
    const isLifeSpanValid = lifeSpanPattern.test(formData.life_span);
    const isTemperamentsValid = temperamentPattern.test(formData.temperaments);
    const isImageUrlValid = imageUrlPattern.test(formData.image.trim());

    setIsSubmitDisabled(
      !isHeightImperialValid ||
      !isHeightMetricValid ||
      !isWeightImperialValid ||
      !isWeightMetricValid ||
      !isNameValid ||
      !isLifeSpanValid ||
      !isTemperamentsValid ||
      !isImageUrlValid
    );

    if (!isHeightImperialValid || !isHeightMetricValid || !isWeightImperialValid || !isWeightMetricValid) {
      alert('Por favor, ingrese un valor válido para la altura y el peso.');
    }

    if (!isNameValid) {
      alert('Por favor, ingrese un nombre válido con un máximo de 25 caracteres.');
    }

    if (!isLifeSpanValid) {
      alert('Por favor, ingrese un rango de vida válido (por ejemplo, "10 - 15 years").');
    }

    if (!isTemperamentsValid) {
      const availableTemperaments = temperamentOptions.join(', ');
      alert(`Los temperamentos ingresados no son válidos. Los temperamentos disponibles son: ${availableTemperaments}`);
    }

    if (!isImageUrlValid) {
      alert('Por favor, ingrese una URL de imagen válida.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userTemperaments = formData.temperaments.split(',').map(t => t.trim());
      const validTemperaments = userTemperaments.every(t => temperamentOptions.includes(t));

      if (!validTemperaments) {
        const availableTemperaments = temperamentOptions.join(', ');
        alert(`Los temperamentos ingresados no son válidos. Los temperamentos disponibles son: ${availableTemperaments}`);
        return;
      }

      validateForm(); // Validar el formulario antes de enviarlo

      const newDogData = {
        id: lastId,
        height: {
          imperial: formData.height.imperial,
          metric: formData.height.metric
        },
        weight: {
          imperial: formData.weight.imperial,
          metric: formData.weight.metric
        },
        name: formData.name,
        life_span: formData.life_span,
        temperaments: formData.temperaments,
        image: formData.image,
      };

      await axios.post('http://localhost:3001/dogs', newDogData);
      console.log('Dog created successfully!');
      handleAlert();

      setFormData({
        height: {
          imperial: '',
          metric: ''
        },
        weight: {
          imperial: '',
          metric: ''
        },
        id: lastId + 1,
        name: '',
        life_span: '',
        temperaments: '',
        image: '' 
      });

      setIsSubmitDisabled(true);
      setLastId(lastId + 1);
    } catch (error) {
      console.error('Error creating dog:', error);
    }
  };

  return (
    <div className="formpage-container">
      <div className="left-content">
        <img src={perritoImage} alt="Puppy" className="dog-image" />
      </div>
      <div className="right-content">
        <h2 className="form-title">Create a new dog breed</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="heightImperial" className="form-label">Height (Imperial):</label>
            <input
              type="text"
              id="heightImperial"
              name="height.imperial"
              value={formData.height.imperial}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="9 - 12"
            />
          </div>
          <div className="form-section">
            <label htmlFor="heightMetric" className="form-label">Height (Metric):</label>
            <input
              type="text"
              id="heightMetric"
              name="height.metric"
              value={formData.height.metric}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="23 - 30"
            />
          </div>
          <div className="form-section">
            <label htmlFor="weightImperial" className="form-label">Weight (Imperial):</label>
            <input
              type="text"
              id="weightImperial"
              name="weight.imperial"
              value={formData.weight.imperial}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="6 - 13"
            />
          </div>
          <div className="form-section">
            <label htmlFor="weightMetric" className="form-label">Weight (Metric):</label>
            <input
              type="text"
              id="weightMetric"
              name="weight.metric"
              value={formData.weight.metric}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="3 - 6"
            />
          </div>
          <div className="form-section">
            <label htmlFor="name" className="form-label">Name: (max 25 characters)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-text"
              maxLength="25"
              required
              placeholder="Labrador Retriever"
            />
          </div>
          <div className="form-section">
            <label htmlFor="lifeSpan" className="form-label">Lifespan: ( numbers separated by " - " )</label>
            <input
              type="text"
              id="lifeSpan"
              name="life_span"
              value={formData.life_span}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="10 - 12 years"
            />
          </div>
          <div className="form-section">
            <label htmlFor="temperaments" className="form-label">Temperaments: (max 5 per dog) </label>
            <input
              type="text"
              id="temperaments"
              name="temperaments"
              value={formData.temperaments}
              onChange={handleChange}
              className="form-text"
              placeholder="Enter temperaments separated by commas"
            />
          </div>
          <div className="form-section">
            <label htmlFor="image" className="form-label">Image URL:</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-text"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <button type="submit" className={`create-button ${isSubmitDisabled ? 'disabled' : ''}`} disabled={isSubmitDisabled}>Create</button>
          <Link to="/home" className="back-button">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default FormPage;