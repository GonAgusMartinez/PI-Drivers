import React from 'react';
import '../Paginado/Paginado.css';

const Paginado = ({ driversPerPage, totalDrivers, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalDrivers / driversPerPage);

  let lowerLimit = Math.max(1, currentPage - 5);
  let upperLimit = Math.min(currentPage + 5, totalPages);

  if (upperLimit - lowerLimit + 1 < 10) {
    if (currentPage <= 5) {
      upperLimit = Math.min(10, totalPages);
    } else {
      lowerLimit = Math.max(1, totalPages - 9);
    }
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
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
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}

export default Paginado;