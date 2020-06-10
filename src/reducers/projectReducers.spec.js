/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { projects, currentProjectInfo } from './projectReducers';

describe('projects reducer', () => {
    // Fetch Basic Info about User
  it('It should return a list of projects', () => {
    const initialState = {
      isFetching: false,
      items: [],
    };

    const expectedState = {
      isFetching: false,
      items: [1, 2, 3],
    };

    const resultState = projects(deepFreeze(initialState), {
      type: 'FETCH_PROJECTS_SUCCESS',
      projects: [1, 2, 3],

    });

    assert.deepEqual(resultState, expectedState);
  });
});

describe('currentProjectInfo redcuers', () => {
  it('It should return info a about the current project', () => {
    const initialState = {
      price: '$15.00',
    };

    const expectedState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const resultState = currentProjectInfo(deepFreeze(initialState), {
      type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
      project: {
        price: '$15.00',
        name: 'hola',
        _id: 1234321,
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the name of the current project', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const expectedState = {
      price: '$15.00',
      name: 'new name',
      id: 1234321,
    };

    const resultState = currentProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_SUCCESS',
      project: {
        name: 'new name',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the price of the current project', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      id: 1234321,
    };

    const expectedState = {
      price: '$25.00',
      name: 'hola',
      id: 1234321,
    };

    const resultState = currentProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_PROJECT_PRICE',
      price: '$25.00',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update the time project was last saved', () => {
    const initialState = {
      price: '$15.00',
      name: 'hola',
      timeLastSaved: '5pm',
      id: 1234321,
    };

    const expectedState = {
      price: '$15.00',
      name: 'hola',
      timeLastSaved: '6pm',
      id: 1234321,
    };

    const resultState = currentProjectInfo(deepFreeze(initialState), {
      type: 'UPDATE_LAST_SAVED_TIME',
      time: '6pm',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
