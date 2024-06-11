import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/Searchbar';
import Cards from '../Cards/Cards';
import Paginado from '../Paginado/Paginado';
import Loader from '../Loader/Loader';
import '../Homepage/Homepage.css';

const Homepage = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs');
        setDogs(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
  
    fetchData();
  }, []);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">WoofWiki</h1>
      <div className="title-space"></div>
      <SearchBar />
      <div className="searchbar-space"></div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="cards-container">
            <Cards dogs={currentDogs} />
          </div>
          <div className="cards-paginado-space"></div>
          <div className="paginado-container">
            <Paginado
              dogsPerPage={dogsPerPage}
              totalDogs={dogs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          <div className="paginado-buttons-space"></div>
          <div className="buttons-container">
            <Link to="/form" className="button-link">
              Go to Create
            </Link>
            <Link to="/info" className="button-link">
              Go to Info
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;