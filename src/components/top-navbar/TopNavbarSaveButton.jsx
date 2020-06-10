import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import store from 'reduxFiles/store';
import * as actions from 'actions/indexActions';

import { projectsUrl } from 'config/endpointUrls';
import './top-navbar-styles/_TopNavbarButtons.scss';

export function SaveButton(props) {
  const { hasUnsavedChanges } = props;

  const saveProject = () => {
    const {
      x,
      y,
      width,
      height,
      id,
      modules,
      projectName,
      thumbnail,
      topLeftAnchorX,
      topLeftAnchorY,
    } = props;

    const updatedModules = modules.map((module) => {
      const x = module.x - topLeftAnchorX;
      const y = module.y - topLeftAnchorY;
      return Object.assign({}, module, { x, y });
    });

    const updatedProject = {
      projectName,
      boardSpecs: {
        width,
        height,
        thumbnail,
        x: x + topLeftAnchorX,
        y: y + topLeftAnchorY,
      },
      modules: updatedModules,
    };

    store.dispatch(actions.updateProject(updatedProject, id));
  };

  const handleClick = () => {
    const { updateLastSaved, recordSavedChanges } = props;

    saveProject();
    updateLastSaved();
    recordSavedChanges();
  };

  return (
    <button className="nav-button save-button" onClick={handleClick}>
      <div>
        <FontAwesome name="fa-cloud" className="fa-cloud" />
        <span>Save</span>
        {/* <span className="save-button-bar" /> */}
        <span className={`save-button-bar ${hasUnsavedChanges ? 'active' : ''}`} />
      </div>
    </button>
  );
}

const mapStateToProps = state => ({
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  hasUnsavedChanges: state.hasUnsavedChanges,
  id: state.currentProjectInfo.id,
  modules: state.currentProjectModules.present,
  projectName: state.currentProjectInfo.name,
  projects: state.projects.items,
  thumbnail: state.boardSpecs.tempThumbnail,
  topLeftAnchorX: state.anchorPositions.topLeft.x,
  topLeftAnchorY: state.anchorPositions.topLeft.y,
});

export default connect(mapStateToProps)(SaveButton);

SaveButton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  modules: PropTypes.array.isRequired,
  projectName: PropTypes.string,
  projects: PropTypes.array.isRequired,
  recordSavedChanges: PropTypes.func.isRequired,
  thumbnail: PropTypes.string,
  topLeftAnchorX: PropTypes.number,
  topLeftAnchorY: PropTypes.number,
  updateThumbnail: PropTypes.func.isRequired,
};
