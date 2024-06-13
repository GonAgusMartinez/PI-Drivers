import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../Searchbar/Searchbar';
import Card from '../Cards/Cards';
import Paginado from '../Paginado/Paginado';
import Loader from '../Loader/Loader';
import '../Homepage/Homepage.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/drivers');
        dispatch({ type: 'SET_DRIVERS', payload: response.data });
        setFilteredDrivers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
  
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filtered = drivers.filter(driver => 
      (driver.name.forename + ' ' + driver.name.surname).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrivers(filtered);
  }, [searchTerm, drivers]);

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">DriversCup</h1>
      <div className="title-space"></div>
      <SearchBar onSearch={setSearchTerm} />
      <div className="searchbar-space"></div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="cards-container">
            {currentDrivers.map(driver => (
              <Card
                key={driver.id}
                id={driver.id}
                name={driver.name}
                image={driver.image}
                teams={driver.teams}
              />
            ))}
          </div>
          <div className="cards-paginado-space"></div>
          <div className="paginado-container">
            <Paginado
              driversPerPage={driversPerPage}
              totalDrivers={filteredDrivers.length}
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