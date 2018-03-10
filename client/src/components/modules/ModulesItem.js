import React, { PureComponent } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import enforceRules from 'helpers/enforceRules';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail from 'helpers/generateThumbnail';
import { areDependenciesMet } from 'helpers/dependencies';
import { compose } from 'helpers/functional';

const getKonvaChildByIndex = index => konvaNode => konvaNode.children[index];

const getKonvaParentByName = (name) => (konvaNode) => {
  if (konvaNode.getName() === name) {
    return konvaNode;
  }

  return getKonvaParentByName(name)(konvaNode.getParent());
}

const getTopLeftAnchor = compose(
  getKonvaChildByIndex(1),
  getKonvaParentByName('boardGroup')
);

export default class ModulesItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      strokeWidth: 1,
    };
  }

  setImage() {
    if (this.props.imageSrc) {
      const image = new window.Image();
      image.src = this.props.imageSrc;
      image.onload = () =>
      store.dispatch(actions.updateModuleImage({
        index: this.props.index,
        imageNode: image,
      }));
    }
  }

  setDefaultStroke() {
    const module = this.refs.moduleGroup;
    module.attrs.defaultStroke = this.props.stroke;
    module.attrs.isStrokeRed = false;
  }

  highlightRuleBreakingModules(module, index) {
    const { isDraggingToBoard } = this.props;
    const draggingModuleNode = module || this.refs.moduleGroup;
    const boardGroup = draggingModuleNode.getParent();
    const moduleNodeArray = boardGroup.get('.moduleGroup');
    const boardNode = boardGroup.getParent().get('.board')[0];

    if (index) {
      moduleNodeArray.splice(index, 1);
    }

    const addRedStroke = (node) => {
      node.attrs.isStrokeRed = true;
      node.attrs.name === 'board'
        ? store.dispatch(actions.updateBoardStroke('red'))
        : node.attrs.isStrokeRed = true;
    };

    const removeRedStroke = (node) => {
      node.attrs.isStrokeRed = false;

      node.attrs.name === 'board'
        ? store.dispatch(actions.updateBoardStroke(null))
        : node.attrs.isStrokeRed = false;
    };

    if (!isDraggingToBoard && isDraggingToBoard !== undefined) {
      enforceRules(moduleNodeArray, boardNode, addRedStroke, removeRedStroke);
    }
  }

  showDependencies() {
    const { dependencies, metDependencies, text, index } = this.props;

    if (!areDependenciesMet(dependencies, metDependencies)) {
      const dependencyData = {
        dependencies,
        text,
        index,
      };

      store.dispatch(actions.updateIconVisibity('DEPENDENCY'));
      store.dispatch(actions.updateCurrentDependencies(dependencyData));
    }
  }

  callWithTimeout() {
    this.highlightRuleBreakingModules();
  }

  componentDidMount() {
    this.setImage();
    this.setDefaultStroke();
    setTimeout(this.callWithTimeout.bind(this), 5);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.metDependencies.length !== this.props.metDependencies.length) {
      store.dispatch(actions.updateModuleFill());
    }

    if (prevProps.rotation !== this.props.rotation) {
      this.highlightRuleBreakingModules();
    }

    if (this.props.shouldCheckCollission) {
      this.highlightRuleBreakingModules();
      this.props.toggleShouldCheckCollission();
    }
  }

  getNewPosition() {
    const { boundToSideIndex } = this.props;
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const module = this.refs.moduleGroup;
    const newPosition = {
      x: module.getPosition().x,
      y: module.getPosition().y,
      index: this.props.index,
    };

    return newPosition;
  }

  getFill() {
    const { metDependencies, dependencies, isDraggingToBoard, id } = this.props;
    if (id === '100') {
      return null;
    }

    if ((metDependencies.length === dependencies.length) || (id === '110')) {
      return 'green';
    }

    if (metDependencies.length === 0) {
      return 'red';
    }

    return null;
  }

  handleMouseOver() {
    this.setState({
      strokeWidth: 1.5,
    });
    document.body.style.cursor = 'move';

    store.dispatch(actions.updateSelectedModule(this.props));
    store.dispatch(actions.toggleIsMouseOverModule(true));
  }

  handleMouseOut() {
    this.setState({
      strokeWidth: 1,
    });

    document.body.style.cursor = 'default';
    store.dispatch(actions.toggleIsMouseOverModule(false));
  }

  handleDragMove() {
    // const newPosition = this.getNewPosition();
    // store.dispatch(actions.updateModulePosition(newPosition));
  }

  handleDragEnd() {
    const module = this.refs.moduleGroup;
    const newPosition = this.getNewPosition();
    store.dispatch(actions.updateModulePosition(newPosition));
    this.highlightRuleBreakingModules();
  }

  handleClick(evt) {
    if (evt.evt.which === 1) {
      this.showDependencies();
    }
  }

  handleDoubleClick() {
    this.props.rotate();
  }

  renderImage() {
    const { imageX, imageY, imageHeight, imageWidth, imageNode } = this.props;
    return (
      <Image
        x={imageX}
        y={imageY}
        height={imageHeight}
        width={imageWidth}
        image={imageNode}
      />
    );
  }

  render() {
    const { anchorPositions, boardSpecs, isDraggingToBoard, selectedModuleProps } = this.props;
    const { moduleGroup } = this.refs;
    const defaultStroke = moduleGroup ? moduleGroup.attrs.defaultStroke: null;
    const isStrokeRed = moduleGroup ? moduleGroup.attrs.isStrokeRed : null;
    const topLeftAnchor = moduleGroup && (isDraggingToBoard === false)
      ? getTopLeftAnchor(moduleGroup)
      : null;

    return (
      <Group
        draggable="true"
        ref="moduleGroup"
        name="moduleGroup"
        x={topLeftAnchor
          ? bindToPerimeter(this.props, topLeftAnchor.attrs, boardSpecs).x
          : this.props.x
        }
        y={topLeftAnchor
          ? bindToPerimeter(this.props, topLeftAnchor.attrs, boardSpecs).y
          : this.props.y
        }
        height={this.props.height}
        width={this.props.width}
        onDragEnd={this.handleDragEnd.bind(this)}
        onDragMove={this.handleDragMove.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <Text
          ref="text"
          x={this.props.textX}
          y={this.props.textY}
          width={this.props.width}
          text={this.props.text}
          fontSize={this.props.fontSize}
          fontFamily={this.props.fontFamily}
        />

        <Group
          ref="innerGroup"
          name="innerGroup"
          x={this.props.innerGroupX}
          y={this.props.innerGroupY}
          rotation={this.props.rotation}
          onClick={this.handleClick.bind(this)}
          onDblClick={this.handleDoubleClick.bind(this)}
        >

          <Rect
            ref="topLayer"
            width={this.props.width}
            height={this.props.height}
            fill={this.getFill()}
            opacity={this.props.opacity}
          />

          <Rect
            name="moduleBorder"
            ref="moduleBorder"
            width={this.props.width}
            height={this.props.height}
            stroke={isStrokeRed ? 'red' : this.props.stroke}
            strokeWidth={this.state.strokeWidth}
          />

          {this.props.imageSrc ? this.renderImage() : <Group />}
        </Group>
      </Group>
    );
  }
}

ModulesItem.defaultProps = {
  metDependencies: [],
};
