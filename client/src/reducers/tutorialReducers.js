import * as actions from 'actions/indexActions';

const devMode = false;

const devState = {
  isActive: true,
  isComplete: false,
  shouldRenderTodoList: false,
  disabledIconExceptions: null,
  step: 5,
  previousStep: null,
  todoBools: [false, false, false, false, false],
};

const defaultState = {
  disabledIconExceptions: null,
  isActive: false,
  isComplete: false,
  previousStep: null,
  shouldRenderTodoList: false,
  step: 0,
  todoBools: [false, false, false, false, false],
};

export const tutorial = (state = devMode ? devState : defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_IS_TUTORIAL_ACTIVE:
      return {
        ...state,
        isActive: !state.isActive,
      };
    case actions.UPDATE_SHOULD_RENDER_TODO_LIST:
      return {
        ...state,
        shouldRenderTodoList: action.bool,
      };
    case actions.EXIT_TUTORIAL:
      return {
        ...state,
        isActive: !state.isActive,
        shouldRenderTodoList: action.bool,
      };
    case actions.UPDATE_DISABLED_ICON_EXCEPTIONS:
      return {
        ...state,
        disabledIconExceptions: action.exceptions,
      };
    case actions.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
        previousStep: state.step,
      };
    case actions.DECREMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
        previousStep: state.step,
      };
    case actions.SHOW_TUTORIAL_EXIT_SCREEN:
      return {
        ...state,
        step: 0,
        previousStep: state.step,
      };
    case actions.COMPLETE_TODO:
      const { index } = action;

      const newArray = state.todoBools.map((bool, i) => i === index ? true : bool);
      return {
        ...state,
        todoBools: newArray,
      };
    default:
      return state;
  }
};
