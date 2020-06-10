// *move dependency logic to actions file
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import generatePriceString from 'helpers/generatePriceString';
import { getDependencyDiff, updateMetDependencies, getNewDependencyData } from 'helpers/dependencies';

import ModulesItem from './ModulesItem';

import {
  fontSize,
  fontFamily,
  fill,
  opacity,
  stroke,
  strokeWidth,
} from 'config/moduleConfig';

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldCheckCollission: false,
    };
  }

  calculatePrice(modules) {
    if (modules && modules.length > 0) {
      const modulePriceSum = this.props.modules
      .map(module => module.price)
      .reduce((a, b) => a + b);
      const basePrice = 15;
      const totalPriceString = generatePriceString(basePrice + modulePriceSum);

      return totalPriceString;
    }

    return generatePriceString(15);
  }

  updatePrice() {
    const totalPriceString = this.calculatePrice(this.props.modules);
    store.dispatch(actions.updateProjectPrice(totalPriceString));
  }

  updateMetDependencies() {
    const dependencyDiffArray = getDependencyDiff(this.props.modules);
    const dispatchMetDependencies = (metDependencyData) => {
      store.dispatch(actions.updateMetDependencies(metDependencyData));
    };

    function setDelay(metDependencyData) {
      setTimeout(() => {
        dispatchMetDependencies(metDependencyData);
      }, 1);
    }

    dependencyDiffArray.forEach((element) => {
      const { metDependencies, index } = element;

      setDelay({
        metDependencies,
        index,
      });
    });
  }

  dispatchDependencyData({ visibilityMode, dependencyData }) {
    setTimeout(() => {
      store.dispatch(actions.updateIconVisibity(visibilityMode));
      store.dispatch(actions.updateCurrentDependencies(dependencyData));
      store.dispatch(actions.toggleShouldRenderSideBar(true));
    }, 5);
  }

  updateDisplayedDependencies() {
    const { modules } = this.props;
    const newDepenencyData = getNewDependencyData(modules);

    this.updateMetDependencies();
    this.dispatchDependencyData(newDepenencyData);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.modules.length !== this.props.modules.length)) {
      this.updateDisplayedDependencies();
      this.updatePrice();

      this.setState({
        shouldCheckCollission: !this.state.shouldCheckCollission,
      });
    }

    if ((prevProps.modules.length < this.props.modules.length)) {

    }
  }

  componentDidMount() {
    const totalPriceString = this.calculatePrice(this.props.modules);

    this.updateDisplayedDependencies();
    store.dispatch(actions.updateProjectPrice(totalPriceString));
  }

  toggleShouldCheckCollission() {
    this.setState({
      shouldCheckCollission: !this.state.shouldCheckCollission,
    });
  }

  render() {
    const modules = this.props.modules/* [modulesData[0]].*/.map((module, index) =>
      <ModulesItem
        ref="module"
        key={index}
        index={index}
        x={module.x}
        y={module.y}
        width={module.width}
        height={module.height}
        name={module.name}
        boundToSideIndex={module.boundToSideIndex}
        innerGroupX={module.innerGroupX}
        innerGroupY={module.innerGroupY}
        rotation={module.rotation}
        text={module.text}
        textX={module.textX}
        textY={module.textY}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        opacity={opacity}
        stroke={module.stroke}
        strokeWidth={strokeWidth}
        imageX={module.imageX}
        imageY={module.imageY}
        imageWidth={module.imageWidth}
        imageHeight={module.imageHeight}
        imageSrc={module.imageSrc}
        imageNode={module.imageNode}
        iconSrc={module.iconSrc}
        id={module.id}
        dependencies={module.dependencies}
        metDependencies={module.metDependencies}
        checkCollisionTrigger={this.props.checkCollisionTrigger}
        topLeftAnchor={this.props.topLeftAnchor}
        selectedModuleProps={this.props.selectedModuleProps}
        anchorPositions={this.props.anchorPositions}
        boardSpecs={this.props.boardSpecs}
        isDraggingToBoard={this.props.isDraggingToBoard}
        rotate={this.props.rotate}
        shouldCheckCollission={this.state.shouldCheckCollission}
        iconVisibityMode={this.props.iconVisibityMode}
        toggleShouldCheckCollission={this.toggleShouldCheckCollission.bind(this)}
      />,
    );

    return (
      <Group name="moduleGroup">
        {modules}
      </Group>
    );
  }
}

const mapStateToProps = state => ({
  anchorPositions: state.anchorPositions,
  boardSpecs: state.boardSpecs,
  checkCollisionTrigger: state.boardSpecs.checkCollisionTrigger,
  currentDependencyData: state.iconVisibity,
  iconVisibityMode: state.iconVisibity.mode,
  modules: state.currentProjectModules.present,
  selectedModuleProps: state.selectedModule,
  topLeftAnchor: state.anchorPositions.topLeft,
  tutorialStep: state.tutorial.step,
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: [],
};
