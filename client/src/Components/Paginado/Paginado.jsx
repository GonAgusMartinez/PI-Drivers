import React from 'react';
import '../Paginado/Paginado.css';

const Paginado = ({ driversPerPage, totalDrivers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Back</button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalDrivers / driversPerPage)}>Next</button>
    </div>
  );
}

export default Paginado