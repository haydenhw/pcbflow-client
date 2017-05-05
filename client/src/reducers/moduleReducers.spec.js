/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { draggingModule, currentProjectModules } from './moduleReducers';

describe('draggingModule reducer', () => {
  
  it('It should return update draggingModule data', () => {
    const initialState = {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      stroke: 'black',
      rotation: 0
    };
      
    const expectedState = {
      x: 5,
      y: 5,
      width: 75,
      height: 75,
      stroke: 'blue',
      rotation: 90
    };
    
    const resultState = draggingModule(deepFreeze(initialState), {
      type: 'CHANGE_DRAGGING_MODULE',
      moduleData: {
        x: 5,
        y: 5,
        width: 75,
        height: 75,
        stroke: 'blue',
        rotation: 90
      }
    });
    console.log(resultState)
    assert.deepEqual(resultState, expectedState);
  });
});

describe('currentProjectModules reducer', () => {

  it('It should return correct module position', () => {
    const initialState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0
      },
      {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0
      }
    ];

    const expectedState = [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        stroke: 'black',
        rotation: 0
      },
      {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        stroke: 'black',
        rotation: 0
      }
    ];

    const resultState = currentProjectModules(deepFreeze(initialState), {
      type: 'UPDATE_MODULE_POSITION',
      modulePosition: {
        index: 1,
        x: 50,
        y: 50,
      },
    });
    
    assert.deepEqual(resultState, expectedState);
  });
});
