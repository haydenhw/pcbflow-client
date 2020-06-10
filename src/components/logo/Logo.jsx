import React from 'react';
import PropTypes from 'prop-types';

import './logo-styles/Logo.scss';

export default function Logo({ className, handleClick }) {
  return (
    <div className={`logo ${className || ''}`} onClick={handleClick}>
      <img className="logo-image" src="images/logo-orange-cropped.png" alt="logo" />
      <span className="logo-text">
        <span className="logo-text-bold">PCB</span>
        <span className="logo-text-light">flow</span>
      </span>
    </div>
  );
}
