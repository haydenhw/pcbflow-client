/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { modal } from './modalReducers';

describe('modal reducer', () => {
    // Fetch Basic Info about User
  it('It should return the correct boolean', () => {
    const initialState = {
      shouldRenderModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      shouldRenderModal: true,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'TOGGLE_MODAL',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return updated modalProps', () => {
    const initialState = {
      shouldRenderModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      shouldRenderModal: false,
      modalType: 'ONBOARD',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'UPDATE_MODAL_PROPS',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update state for project delete confirmation', () => {
    const initialState = {
      shouldRenderModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      shouldRenderModal: true,
      modalType: 'CONFIRM',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'CONFIRM_PROJECT_DELETE',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update update the modal type', () => {
    const initialState = {
      shouldRenderModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      shouldRenderModal: false,
      modalType: 'CONFIRM',
      modalProps: null,
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'CHANGE_MODAL_TYPE',
      modalType: 'CONFIRM',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
