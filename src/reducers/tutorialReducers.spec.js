/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { tutorial } from './tutorialReducers';

describe('tutorial reducer', () => {
    // Fetch Basic Info about User
  it('It should toggle isTutorialActive', () => {
    const initialState = {
      isTutorialActive: false,
    };

    const expectedState = {
      isTutorialActive: true,
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'TOGGLE_IS_TUTORIAL_ACTIVE',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle shouldRenderTodoList', () => {
    const initialState = {
      shouldRenderTodoList: false,
    };

    const expectedState = {
      shouldRenderTodoList: true,
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'UPDATE_SHOULD_RENDER_TODO_LIST',
      bool: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle shouldRenderTodoList', () => {
    const initialState = {
      isTutorialActive: false,
      isTutorialComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isTutorialActive: true,
      isTutorialComplete: false,
      shouldRenderTodoList: true,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const resultState = tutorial(deepFreeze(initialState), {
      type: 'EXIT_TUTORIAL',
      bool: true,
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle update disabledIconExceptions', () => {
    const initialState = {
      isTutorialActive: false,
      isTutorialComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isTutorialActive: false,
      isTutorialComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: ['101', '102'],
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };
    const resultState = tutorial(deepFreeze(initialState), {
      type: 'UPDATE_DISABLED_ICON_EXCEPTIONS',
      exceptions: ['101', '102'],
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle update update todoBools array', () => {
    const initialState = {
      isTutorialActive: false,
      isTutorialComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, false],
    };

    const expectedState = {
      isTutorialActive: false,
      isTutorialComplete: false,
      shouldRenderTodoList: false,
      disabledIconExceptions: null,
      step: 0,
      previousStep: null,
      todoBools: [false, false, false, false, true],
    };
    const resultState = tutorial(deepFreeze(initialState), {
      type: 'COMPLETE_TODO',
      index: 4,
    });

    assert.deepEqual(resultState, expectedState);
  });
});
