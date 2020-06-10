import React, { Component } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import enforceRules from 'helpers/enforceRules';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail from 'helpers/generateThumbnail';
import { areDependenciesMet } from 'helpers/dependencies';
import { compose } from 'helpers/functional';
import { getKonvaChildByIndex, getKonvaParentByName} from 'helpers/konvaHelpers';


const getTopLeftAnchor = compose(
  getKonvaChildByIndex(1),
  getKonvaParentByName('boardGroup')
);

export default class ModulesItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      strokeWidth: 1,
      isDragging: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isDragging && nextState.isDragging) {
      return false;
    }

    return true;
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
    const moduleNodeArray = boardGroup.find('.moduleGroup');
    const boardNode = boardGroup.getParent().find('.board')[0];

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
    if (prevProps.checkCollisionTrigger !== this.props.checkCollisionTrigger) {
      this.highlightRuleBreakingModules();
    }

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

  getFill() {
    const { metDependencies, dependencies, isDraggingToBoard, id } = this.props;
    if (id === '100') {
      return null;
    }

    if ((metDependencies.length === dependencies.length) || (id === '110')) {
      return 'green';
    }

    if (metDependencies.length < dependencies.length) {
      return 'red';
    }

    return 'green';
  }

  getNewPosition(x, y) {
    const  { moduleGroup } = this.refs;

    return {
      x: moduleGroup.getPosition().x,
      y: moduleGroup.getPosition().y,
      index: this.props.index,
    };

  }

  handleDragMove() {
    const { selectedModuleProps, anchorPositions, boardSpecs, x, y } = this.props;
    const { boundToSideIndex } = selectedModuleProps;
    const { moduleGroup } = this.refs;

    if (isNaN(boundToSideIndex)) {
      return;
    }

    const topLeftAnchor = getTopLeftAnchor(moduleGroup);
    const newModuleProps = Object.assign({}, selectedModuleProps, {
      x: moduleGroup.getX(),
      y: moduleGroup.getY(),
    });
    const newPosition = bindToPerimeter(newModuleProps, topLeftAnchor.attrs, boardSpecs)

    moduleGroup.setX(newPosition.x);
    moduleGroup.setY(newPosition.y);
  }

  handleDragStart() {
    this.setState({ isDragging: true });
  }

  handleDragEnd() {
    const module = this.refs.moduleGroup;
    const newPosition = this.getNewPosition();
    store.dispatch(actions.updateModulePosition(newPosition));
    this.highlightRuleBreakingModules();
    this.setState({ isDragging: false });
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

  handleClick(evt) {
    if (evt.evt.which === 1) {
      this.showDependencies();
    }
  }

  handleDoubleClick() {
    this.props.rotate();
  }

  renderImage() {
    const {  imageX, imageY, imageHeight, imageWidth, imageNode, imageSrc, } = this.props;
    return (
      <Image
        x={imageX}
        y={imageY}
        height={imageHeight}
        width={imageWidth}
        image={imageNode}
        src={imageSrc}
        name="image"
      />
    );
  }

  render() {
    const { anchorPositions, boardSpecs, isDraggingToBoard, selectedModuleProps } = this.props;
    const { moduleGroup } = this.refs;
    const defaultStroke = moduleGroup ? moduleGroup.attrs.defaultStroke: null;
    const isStrokeRed = moduleGroup ? moduleGroup.attrs.isStrokeRed : null;
    const topLeftAnchor = moduleGroup
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
        onDragStart={this.handleDragStart.bind(this)}
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
