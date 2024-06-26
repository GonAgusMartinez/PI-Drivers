import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilterChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTeamFilterChange = (event) => {
    const value = event.target.value;
    setTeamFilter(value);
    onFilterChange('team', value); 
  };

  const handleOriginFilterChange = (event) => {
    const value = event.target.value;
    setOriginFilter(value);
    onFilterChange('origin', value); 
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    onSortChange(value);
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
          value={teamFilter}
          onChange={handleTeamFilterChange}
        >
          <option value="">Filter by Team</option>
          <option value="Red Bull">Red Bull</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Ferrari">Ferrari</option>
          <option value="McLaren">McLaren</option>
          <option value="Aston Martin">Aston Martin</option>
          <option value="Alpine">Alpine</option>
          <option value="Williams Stake">Williams Stake</option>
          <option value="Haas">Haas</option>
        </select>
        <select
          className="filter-button"
          value={originFilter}
          onChange={handleOriginFilterChange}
        >
          <option value="">Filter by Origin</option>
          <option value="api">From API</option>
          <option value="created">Created</option>
        </select>
        <select
          className="filter-button"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="alphabetical_asc">Alphabetical (A-Z)</option>
          <option value="alphabetical_desc">Alphabetical (Z-A)</option>
          <option value="birthdate_asc">Birthdate (Oldest first)</option>
          <option value="birthdate_desc">Birthdate (Newest first)</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;