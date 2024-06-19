import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilterChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleTeamFilterChange = (event) => {
    setTeamFilter(event.target.value);
    onFilterChange('team', event.target.value);
  };

  const handleOriginFilterChange = (event) => {
    setOriginFilter(event.target.value);
    onFilterChange('origin', event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    onSortChange(event.target.value);
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
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
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