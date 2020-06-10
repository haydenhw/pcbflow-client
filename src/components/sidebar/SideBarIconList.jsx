// fix shouldComponentUpdate function
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import { getUnmetDependencyIds, getUnmetDependencies } from 'helpers/dependencies';
import isObjectEqual from 'helpers/isObjectEqual'

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';

const getVisibleIcons = (props) => {
  const { iconVisibityMode, moduleData, onBoardModules, selectedModuleDependencies } = props;

  switch (iconVisibityMode) {
    case 'ALL':
      return moduleData;
    case 'DEPENDENCY':
      return getUnmetDependencies(moduleData, onBoardModules, selectedModuleDependencies);
    default:
      return moduleList;
  }
};

const SideBarIconList = class extends Component {
  renderSideBarIcon(module, index, isDisabled) {
    const { toggleDraggingToBoard, toggleIsClicked, updateClientPosition } = this.props;

    return (
      <SideBarIcon
        disabled={isDisabled}
        moduleData={module}
        toggleDraggingToBoard={toggleDraggingToBoard}
        toggleIsClicked={toggleIsClicked}
        updateClientPosition={updateClientPosition}
      />
    );
  }

  renderSideBarIconFrame(module, index) {
    const { disabledIconExceptions } = this.props;
    const isDisabled = (
      disabledIconExceptions ? (disabledIconExceptions.indexOf(index) === -1) : false
    );

    return (
      <SideBarIconFrame
        key={index}
        moduleName={module.text}
        modulePrice={module.price}
        id={module.id}
        hasTooltip={module.hasTooltip}
        disabled={isDisabled}
      >
        {this.renderSideBarIcon(module, index, isDisabled)}
      </SideBarIconFrame>
    );
  }

  render() {
    const visibleIcons = getVisibleIcons(this.props);
    const iconList = visibleIcons.map((module, index) => (
      this.renderSideBarIconFrame(module, index)
    ));

    return (
      <div>
        {iconList}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  disabledIconExceptions: state.tutorial.disabledIconExceptions,
  iconVisibityMode: state.iconVisibity.mode,
  moduleData: state.moduleData,
  onBoardModules: state.currentProjectModules.present,
  selectedModuleDependencies: state.iconVisibity.dependencies,
});

export default connect(mapStateToProps)(SideBarIconList);

SideBarIconList.propTypes = {
  disabledIconExceptions: PropTypes.array,
  iconVisibityMode: PropTypes.string.isRequired,
  moduleData: PropTypes.array.isRequired,
  onBoardModules: PropTypes.array.isRequired,
  selectedModuleDependencies: PropTypes.array.isRequired,
  toggleDraggingToBoard: PropTypes.func.isRequired,
  toggleIsClicked: PropTypes.func,
  updateClientPosition: PropTypes.func.isRequired,
};
