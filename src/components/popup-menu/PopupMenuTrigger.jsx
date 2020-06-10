import React from 'react';
import PropTypes from 'prop-types';

export default function PopupMenuTrigger(props) {
  const { children, handleClick } = props;

  return (
    <div className="popup-menu-trigger-wrapper">
      <div
        className="popup-menu-trigger"
        onClick={handleClick}
        role="menu"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}

PopupMenuTrigger.propTypes = {
  children: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
