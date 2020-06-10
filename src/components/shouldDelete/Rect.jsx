
import React from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { squareData } from '../data';
import collide from '../helper-functions/collide';

export default class MyRect extends React.Component {

  checkBounds() {
    const posX = this.refs.rect.attrs.x;
    const posY = this.refs.rect.attrs.y;
    const rect = this.refs.rect.attrs;
    const width = Number(rect.width);
    const height = Number(rect.height);

    let newX;

    const collisionObject = {
      x: rect.x,
      y: rect.y,
      width,
      height,
      id: rect.id,
    };

    collide(collisionObject, squareData);

        /* if (posX > 500 - width) {
          newX = 500-width;
        } else if (posX < 0) {
          newX = 0;
        } else {
          newX = posX;
        }

        this.refs.rect.attrs.x = newX
        this.refs.rect.attrs.y = posY
        */
  }
  render() {
    return (
      <Group>
        <Rect
          ref="rect"
          x={this.props.x}
          y={this.props.y}
          id={this.props.id}
          width="50"
          height="50"
          fill="green"
          draggable="true"
          onDragMove={this.checkBounds.bind(this)}
        />
      </Group>

    );
  }
}
