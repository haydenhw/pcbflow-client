import React from 'react';
import PropTypes from 'prop-types';

import './top-navbar-styles/_TopNavbarButtons.scss';

export default function TopNavbarButton(props) {
  const { className, handleClick, icon, text } = props;

  return (
    <button className={className} onClick={handleClick}>
        {/* // *make icon a child instead of a prop */}
        {icon}
        <span>{text}</span>
    </button>
  );
}

TopNavbarButton.propTypes = {
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};
