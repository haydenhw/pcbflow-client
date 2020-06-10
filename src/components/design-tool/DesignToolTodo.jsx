import React from 'react';
import PropTypes from 'prop-types';

import Interactive from 'components/Interactable';

import './design-tool-styles/_DesignToolTodo.scss';

const draggableOptions = {
  onmove: (event) => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
    `translate(${x}px, ${y}px)`;

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },
};

const getTextDecoration = function (bool) {
  return bool ? { textDecoration: 'line-through' } : {};
};

export default function DesignToolTodo(props) {
  const { todoBools, handleLinkClick } = props;

  return (
    <Interactive draggable draggableOptions={draggableOptions}>
      <div className="todo">
        <h2>Modules To Add:</h2>
        <ul>
          <li style={getTextDecoration(todoBools[2])}>HDMI Connector</li>
          <li style={getTextDecoration(todoBools[1])}>MicroSD Slot</li>
          <li style={getTextDecoration(todoBools[0])}>USB Type-A Jack</li>
          <li style={getTextDecoration(todoBools[3])}>Tactile Switch</li>
          <li style={getTextDecoration(todoBools[4])}>LED</li>
        </ul>
        <div>
          <span onClick={handleLinkClick} role="link" >Exit Tutorial</span>
        </div>
      </div>
    </Interactive>
  );
}

DesignToolTodo.propTypes = {
  handleLinkClick: PropTypes.func.isRequired,
  todoBools: PropTypes.array.isRequired,
};
