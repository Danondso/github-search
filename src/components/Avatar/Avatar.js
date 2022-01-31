import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

function Avatar({ imageSrc, altText }) {
  return (
    <div className="avatar-container">
      <img className="avatar-image" src={imageSrc} alt={altText} />
    </div>
  );
}

Avatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default Avatar;
