import React from 'react';
import PropTypes from 'prop-types';

import './logo-styles/Logo.scss';

export default function Logo() {
  return (
    <div className="logo">
      {/* <div className="logo-alignment-helper" /> */}
      <img className="logo-image" src="images/logo-orange-cropped.png" alt="logo" />
      <span className="logo-text">
        <span className="logo-text-bold">PCB</span>
        <span className="logo-text-light">flow</span>
      </span>
    </div>
  );
}
