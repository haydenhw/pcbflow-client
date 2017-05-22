import React from 'react';

import './design-tool-styles/DesignToolInfoButton.css';

export default function DesignToolInfoButton(props) {
  return (
    <div
      onClick={props.clickHandler}
      className={`round-button ${props.tooltipHook}`}
    >
      <div className="round-button-icon">{props.icon}</div>
      <div className="round-button-circle" />
    </div>
  );
}
