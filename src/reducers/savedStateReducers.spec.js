/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { hasUnsavedChanges } from './savedStateReducers';

describe('hasUnsavedChanges reducer', () => {
    // Fetch Basic Info about User
  it('It should set state to true if a change is made to a project', () => {
    const initialState = false;

    const expectedState = true;

    const resultState = hasUnsavedChanges(deepFreeze(initialState), {
      type: 'UPDATE_MODULE_POSITION',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should toggle state project is saved', () => {
    const initialState = true;

    const expectedState = false;

    const resultState = hasUnsavedChanges(deepFreeze(initialState), {
      type: 'TOGGLE_HAS_UNSAVED_CHANGES',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
