import React from 'react';
import PropTypes from 'prop-types';

import './design-tool-styles/_DesignToolInfoButton.scss';

export default function DesignToolInfoButton(props) {
  const { clickHandler, icon } = props;
  return (
    <div
      className={'round-button'}
      onClick={clickHandler}
      role="button"
    >
      <div className="round-button-icon">{icon}</div>
      <div className="round-button-circle" />
    </div>
  );
}

DesignToolInfoButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};
