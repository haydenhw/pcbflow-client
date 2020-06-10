import * as actions from 'actions/indexActions';

const defaultState = {
  shouldRenderModal: false,
  modalType: 'ONBOARD',
  modalProps: null,
};

export const modal = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MODAL:
    case actions.DELETE_PROJECT_REQUEST:
    case actions.EXIT_TUTORIAL:
      return {
        ...state,
        shouldRenderModal: !state.shouldRenderModal,
      };
    case actions.CHANGE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType,
      };
    case actions.UPDATE_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_PROJECT_DELETE:
      return {
        shouldRenderModal: true,
        modalType: 'CONFIRM',
        modalProps: action.modalProps,
      };
    case actions.CONFIRM_ROUTE_LEAVE:
      return {
        shouldRenderModal: true,
        modalType: 'CONFIRM_ROUTE_LEAVE',
        modalProps: action.modalProps,
      };
    case actions.OFFER_TUTORIAL:
    case actions.START_TUTORIAL:
      return {
        shouldRenderModal: true,
        modalType: 'ONBOARD',
        modalProps: action.modalProps,
      };
    default:
      return state;
  }
};
