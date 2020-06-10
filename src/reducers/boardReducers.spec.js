/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { boardSpecs, anchorPositions } from './boardReducers';

describe('boardSpecs reducer', () => {
    // Fetch Basic Info about User
  it('It should return correct height and width', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 10,
      y: 10,
      width: 105,
      height: 34,
    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'UPDATE_BOARD_DIMENSIONS',
      dimensions: {
        width: 105,
        height: 34,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return the correct position', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 25,
      y: 25,
      width: 600,
      height: 300,
    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'UPDATE_BOARD_POSITION',
      position: {
        x: 25,
        y: 25,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return the correct stroke', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
      stroke: 'red',
    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'UPDATE_BOARD_STROKE',
      boardStroke: 'red',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return the correct boardSpecs', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 50,
      y: 50,
      width: 450,
      height: 450,

    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
      project: {
        boardSpecs: {
          x: 50,
          y: 50,
          width: 450,
          height: 450,
        },
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return the correct thumbnail', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
    };

    const expectedState = {
      x: 10,
      y: 10,
      width: 600,
      height: 300,
      thumbnail: 'This is a string',

    };

    const resultState = boardSpecs(deepFreeze(initialState), {
      type: 'UPDATE_BOARD_THUMBNAIL',
      thumbnail: 'This is a string',
    });

    assert.deepEqual(resultState, expectedState);
  });
});

describe('anchorPositions reducer', () => {
    // Fetch Basic Info about User
  it('It should return correct height and width', () => {
    const initialState = {
      topLeft: { x: 0, y: 0 },
      topRight: { x: null, y: 0 },
      bottomLeft: { x: 0, y: null },
      bottomRight: { x: null, y: null },
    };

    const expectedState = {
      topLeft: { x: 0, y: 0 },
      topRight: { x: 15, y: 15 },
      bottomLeft: { x: 50, y: 50 },
      bottomRight: { x: 20, y: 20 },
    };

    const resultState = anchorPositions(deepFreeze(initialState), {
      type: 'UPDATE_ANCHOR_POSITIONS',
      positions: {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 15, y: 15 },
        bottomLeft: { x: 50, y: 50 },
        bottomRight: { x: 20, y: 20 },
      },
    });

    assert.deepEqual(resultState, expectedState);
  });
});
