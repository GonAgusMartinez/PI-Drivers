import React, { useState } from 'react';
import './Searchbar.css';

const SearchBar = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [temperamentFilter, setTemperamentFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTemperamentFilterChange = (event) => {
    setTemperamentFilter(event.target.value);
  };

  const handleOriginFilterChange = (event) => {
    setOriginFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };


  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filters-container">
        <select
          className="filter-button"
          value={temperamentFilter}
          onChange={handleTemperamentFilterChange}
        >
          <option value="">Temperament</option>
          
        </select>
        <select
          className="filter-button"
          value={originFilter}
          onChange={handleOriginFilterChange}
        >
          <option value="api">Api</option>
          <option value="database">Database</option>
        </select>
        <select
          className="filter-button"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="weight">Weight</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;