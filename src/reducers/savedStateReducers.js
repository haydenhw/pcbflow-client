import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

export const hasUnsavedChanges = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_HAS_UNSAVED_CHANGES:
      return false;
  }

  if (doesModifyProject(action)) {
    return true;
  }

  return state;
};
