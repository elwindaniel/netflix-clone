import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from '../../services/axios';
import './Modal.css';
import PropTypes from 'prop-types';

ReactModal.setAppElement('#root');

const Modal = ({ movie, isOpen, onRequestClose }) => {
  const [video, setVideo] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      const request = await axios.get(
        `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      if (request.data.results.length > 0) {
        setVideo(request.data.results[0].key);
      }
    };
    if (isOpen) {
      fetchVideo();
    }
  }, [isOpen, movie]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Details"
      className="modal"
      overlayClassName="modal__overlay"
    >
      <button className="modal__close" onClick={onRequestClose}>
        &times;
      </button>
      <div className="modal__content">
        <h2>{movie.title || movie.name || movie.original_name}</h2>
        <p>{movie.overview}</p>
        {video && (
          <iframe
            title="Movie Trailer"
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  movie: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
