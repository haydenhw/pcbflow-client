import React from 'react';
import PropTypes from 'prop-types';

import generatePriceString from 'helpers/generatePriceString';

import './side-bar-styles/_SideBarIconFrame.scss';

export default function SideBarIconFrame(props) {
  const fadeOut = {
    opacity: '0.3',
  };
  const {
    children,
    disabled,
    hasTooltip,
    id,
    moduleName,
    modulePrice,
  } = props;

  return (
    <div
      className={`icon-frame-container ${hasTooltip ? `toolTip-${id}` : ''}`}
      style={props.disabled ? fadeOut : {}}
    >
      <div className="module-icon-frame-title">
        {props.moduleName}
      </div>
      <div className="icon-frame-body">
        {props.children}
      </div>
      <div className="icon-frame-price">
        {generatePriceString(props.modulePrice)}
      </div>
    </div>
  );
}

SideBarIconFrame.propTypes = {
  children: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  hasTooltip: PropTypes.bool,
  id: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
  modulePrice: PropTypes.number.isRequired,
};
