import * as actions from '../actions/indexActions';

const defaultMouseEvents = {
  isMouseOverModule: false,
  mouseDownOnIcon: false,
  isMouseDown: false,
  isContextMenuOpen: false,
};

export const mouseEvents = (state = defaultMouseEvents, action) => {
  switch (action.type) {
    case actions.MOUSE_DOWN_ON_ICON:
      return {
        ...state,
        mouseDownOnIcon: action.isDown,
      };
      break;

    case actions.TOGGLE_IS_MOUSE_DOWN:
      return {
        ...state,
        isMouseDown: action.isDown,
      };
      break;

    case actions.TOGGLE_IS_MOUSE_OVER_MODULE:
      return {
        ...state,
        isMouseOverModule: action.isOver,
      };
      break;

    case actions.TOGGLE_IS_CONTEXT_MENU_OPEN:
      return {
        ...state,
        isContextMenuOpen: action.isOpen,
      };
      break;

    default:
      return state;
  }
};
