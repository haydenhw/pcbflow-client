import React from 'react';
import PropTypes from 'prop-types';

import './side-bar-styles/_SideBarDependencyMessage.scss';

export default function SideBarDependencyMessage(props) {
  const { moduleName, showAll } = props;
  return (
    <div className="dependency-message">
      <p>Showing dependencies for module</p>
      <h2>{moduleName}</h2>
      <p className="show-all" onClick={showAll} role="link">Show all modules</p>
    </div>
  );
}

SideBarDependencyMessage.propTypes = {
  moduleName: PropTypes.string.isRequired,
  showAll: PropTypes.func.isRequired,
};
