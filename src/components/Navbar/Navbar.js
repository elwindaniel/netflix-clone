import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from '../../services/axios';
// import requests from '../../services/requests';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar);
    return () => window.removeEventListener('scroll', transitionNavbar);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        const request = await axios.get(
          `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`
        );
        setSearchResults(request.data.results);
      } else {
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <nav className={`navbar navbar--black`}>
      <img
        className="navbar__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <input
        type="text"
        className="navbar__search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div className="navbar__searchResults">
          {searchResults.slice(0, 5).map((movie) => (
            <div key={movie.id} className="navbar__searchResult">
              <img
                src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                alt={movie.title}
              />
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}
      <img
        className="navbar__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
      />
    </nav>
  );
};

export default Navbar;
