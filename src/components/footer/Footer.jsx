import React from 'react';
import PropTypes from 'prop-types';

import './footer-styles/_Footer.scss';

export default function Footer(props) {
  const timeLastSaved = (
    <div className="time-last-saved footer-wrapper">
      <span>Last saved: </span>
      <span>{props.timeLastSaved}</span>
    </div>
  );

  return (
    <div className="footer">
      <div className="project-price footer-wrapper">
        <span>Price/Unit: </span>
        <span>{props.price}</span>
      </div>
      {props.timeLastSaved && timeLastSaved}
    </div>
  );
}

Footer.propTypes = {
  price: PropTypes.string.isRequired,
  timeLastSaved: PropTypes.string,
};
