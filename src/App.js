import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Details from './pages/Details'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future Route: <Route path="/details/:id" element={<Details />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
