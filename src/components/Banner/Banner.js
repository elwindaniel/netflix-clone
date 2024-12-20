import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import requests from '../../services/requests';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(randomMovie);
      return request;
    };
    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + '...' : str;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
    </header>
  );
};

export default Banner;
