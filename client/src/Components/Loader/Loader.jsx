import React from 'react';
import '../Loader/Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <div className="loader-circle loader-circle--second"></div>
    </div>
  );
};

export default Loader;