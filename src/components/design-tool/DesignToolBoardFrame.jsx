import React from 'react';
import PropTypes from 'prop-types';

export default function DesignToolBoardFrame(props) {
  const { width, height, top, left } = props;

  const style = {
    position: 'absolute',
    width,
    height,
    top,
    left,
  };

  return <div className="board-frame" style={style} />;
}

DesignToolBoardFrame.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
