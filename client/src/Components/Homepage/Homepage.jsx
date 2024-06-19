import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrivers } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Cards/Cards';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import Paginado from '../Paginado/Paginado';
import './Homepage.css';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;

  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  // Función para aplicar filtros y ordenamiento
  const applyFiltersAndSort = () => {
    if (!drivers) return []; // Manejar el caso donde drivers es undefined

    let filteredDrivers = drivers.filter((driver) =>
      `${driver.name.forename} ${driver.name.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Aplicar filtro por equipo si está seleccionado
    if (teamFilter) {
      filteredDrivers = filteredDrivers.filter((driver) =>
        driver.teams.includes(teamFilter)
      );
    }

    // Aplicar filtro por origen si está seleccionado
    if (originFilter === 'api') {
      filteredDrivers = filteredDrivers.filter((driver) => !driver.created);
    } else if (originFilter === 'created') {
      filteredDrivers = filteredDrivers.filter((driver) => driver.created);
    }

    // Aplicar ordenamiento si está seleccionado
    if (sortBy === 'alphabetical_asc') {
      filteredDrivers.sort((a, b) =>
        `${a.name.forename} ${a.name.surname}`.localeCompare(`${b.name.forename} ${b.name.surname}`)
      );
    } else if (sortBy === 'alphabetical_desc') {
      filteredDrivers.sort((a, b) =>
        `${b.name.forename} ${b.name.surname}`.localeCompare(`${a.name.forename} ${a.name.surname}`)
      );
    } else if (sortBy === 'birthdate_asc') {
      filteredDrivers.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    } else if (sortBy === 'birthdate_desc') {
      filteredDrivers.sort((a, b) => new Date(b.dob) - new Date(a.dob));
    }

    return filteredDrivers;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Resetear página actual al buscar
  };

  const handleFilterChange = (type, value) => {
    if (type === 'team') {
      setTeamFilter(value);
    } else if (type === 'origin') {
      setOriginFilter(value);
    }
    setCurrentPage(1); // Resetear página actual al aplicar filtro
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1); // Resetear página actual al cambiar el ordenamiento
  };

  const filteredDrivers = applyFiltersAndSort();

  // Lógica de paginación
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">DriversCup</h1>
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="cards-container">
            {currentDrivers.map((driver) => (
              <Card
                key={driver.id}
                id={driver.id}
                name={driver.name}
                image={driver.image}
                teams={driver.teams}
              />
            ))}
          </div>
          <div className="pagination">
            <Paginado
              driversPerPage={driversPerPage}
              totalDrivers={filteredDrivers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
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