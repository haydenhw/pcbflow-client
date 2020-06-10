import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import generateThumbnail from 'helpers/generateThumbnail';

import Modules from 'components/modules/Modules';
import ModulesItem from 'components/modules/ModulesItem';
import Anchor from './BoardAnchor';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.board = this.refs.board;
    store.dispatch(actions.offerTutorialIfInitialVisit());
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateBoardTrigger !== prevProps.updateBoardTrigger) {
      const { topLeft } = this.props;
      this.board.setX(topLeft.x);
      this.board.setY(topLeft.y);
    }
  }

  updateLocalStatePosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();

    this.setState({
      x,
      y,
    });

    const layer = this.refs.boardGroup.getLayer();
    layer.draw();
  }

  updateGlobalStatePosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();

    store.dispatch(actions.updateBoardPosition({
      x,
      y,
    }));
  }

  handleDragStart() {
    this.props.hideFloatingElements();
  }

  handleDragMove() {
    const layer = this.refs.boardGroup.getLayer();
    layer.draw();
  }

  handleDragEnd() {
    this.updateGlobalStatePosition();
    this.props.unhideFloatingElements();
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      rotate,
      hideFloatingElements,
      unhideFloatingElements,
      updateAnchorTrigger,
      isDraggingToBoard,
    } = this.props;

    const refPosition = this.board ? this.board.getPosition() : null;

    return (
      <Layer
        ref="boardLayer"
        name="boardLayer"
      >
        <Group
          ref="boardGroup"
          name="boardGroup"
          x={this.state.x || x}
          y={this.state.y || y}
          width={width}
          height={height}
          draggable="true"
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        >
          <Rect
            ref="board"
            name={'board'}
            x={this.board ? this.board.getX() : topLeft.x}
            y={this.board ? this.board.getY() : topLeft.y}
            width={width}
            height={height}
            fill="#e3e3e5"
            opacity="0.5"
            stroke={this.props.stroke}
          />

          <Anchor
            x={topLeft.x}
            y={topLeft.y}
            name={'topLeft'}
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={topRight.x || width}
            y={topRight.y}
            name={'topRight'}
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={bottomLeft.x}
            y={bottomLeft.y || height}
            name={'bottomLeft'}
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={bottomRight.x || width}
            y={bottomRight.y || height}
            name={'bottomRight'}
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Modules
            rotate={rotate}
            isDraggingToBoard={isDraggingToBoard}
          />
        </Group>
      </Layer>
    );
  }
}

const mapStateToProps = state => ({
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  topLeft: state.anchorPositions.topLeft,
  topRight: state.anchorPositions.topRight,
  bottomLeft: state.anchorPositions.bottomLeft,
  bottomRight: state.anchorPositions.bottomRight,
  stroke: state.boardSpecs.stroke,
  updateBoardTrigger: state.boardSpecs.updateBoardTrigger,
  updateAnchorTrigger: state.anchorPositions.updateAnchorTrigger,
});

export default connect(mapStateToProps)(Board);

Board.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  topLeft: PropTypes.object.isRequired,
  topRight: PropTypes.object.isRequired,
  bottomLeft: PropTypes.object.isRequired,
  bottomRight: PropTypes.object.isRequired,
  hideFloatingElements: PropTypes.func.isRequired,
  isDraggingToBoard: PropTypes.bool.isRequired,
  rotate: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  unhideFloatingElements: PropTypes.func.isRequired,
};
