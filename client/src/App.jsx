import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Detailpage from './Components/Detailpage/Detailpage';
import Formpage from './Components/Formpage/Formpage';
import Landingpage from './Components/Landingpage/Landingpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/detail/:id" element={<Detailpage />} />
        <Route path="/form" element={<Formpage />} />
      </Routes>
    </Router>
  );
};

export default App;