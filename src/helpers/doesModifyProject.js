import * as actions from 'actions/indexActions';

export default function doesModifyProject(action) {
  switch(action.type) {
    case actions.DELETE_SELECTED_MODULE:
    case actions.PUSH_NEW_MODULE:
    case actions.ROTATE_SELECTED_MODULE:
    case actions.UPDATE_ANCHOR_POSITIONS:
    case actions.UPDATE_BOARD_POSITION:
    case actions.UPDATE_MODULE_POSITION:
    case actions.UPDATE_MODULE_FILL:
    case actions.UPDATE_PROJECT_NAME:
    case actions.UNDO:
    case actions.REDO:
      return true;
    default:
      return false;
  }
}
