import * as actions from 'actions/indexActions';

const defaultboardSpecs = {
  height: 300,
  width: 600,
  x: 100,
  y: 100,
  checkCollisionTrigger: false,
  stroke: '#ccc',
  updateBoardTrigger: false,
};

export const boardSpecs = (state = defaultboardSpecs, action) => {
  switch (action.type) {

    case actions.UPDATE_ANCHOR_POSITIONS:
      return {
        ...state,
        checkCollisionTrigger: !state.checkCollisionTrigger,
      };
      break;
    case actions.UPDATE_BOARD_DIMENSIONS:
      return {
        ...state,
        width: action.dimensions.width,
        height: action.dimensions.height,
      };
      break;
    case actions.UPDATE_BOARD_POSITION:
      return {
        ...state,
        x: action.position.x,
        y: action.position.y,
      };
      break;
    case actions.UPDATE_BOARD_STROKE:
      return {
        ...state,
        stroke: action.boardStroke,
      };
      break;
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        savedThumbnail: state.tempThumbnail,
      };
    break;
    case actions.TRIGGER_BOARD_UPDATE:
      return {
        ...state,
        updateBoardTrigger: !state.updateBoardTrigger,
      };
    case actions.START_TUTORIAL:
      return {
        ...state,
        stroke: null,
        x: (0.5 * (document.documentElement.clientWidth + 200)) - (500 / 2),
        y: (0.5 * document.documentElement.clientHeight) - (300 / 2),
        height: 300,
        width: 500,
      };
    break;
    case actions.SET_ACTIVE_PROJECT:
    case actions.POST_PROJECT_SUCCESS:
      const boardSpecs = action.project.boardSpecs;
      const { x, y, width, height, thumbnail } = boardSpecs;

      return {
        ...state,
        x,
        y,
        width,
        height,
      };
      break;
    default:
      return state;
  }
};

const defaultAnchorPositions = {
  updateAnchorTrigger: false,
  topLeft: { x: 0, y: 0 },
  topRight: { x: null, y: 0 },
  bottomLeft: { x: 0, y: null },
  bottomRight: { x: null, y: null },
};

export const anchorPositions = (state = defaultAnchorPositions, action) => {
  switch (action.type) {
    case actions.UPDATE_ANCHOR_POSITIONS:
      return {
        ...state,
        ...action.positions
      }
      break;
    case actions.TRIGGER_ANCHOR_UPDATE:
      return {
        ...state,
        updateAnchorTrigger: !state.updateAnchorTrigger,
      };
      break;
    case actions.SET_ACTIVE_PROJECT:
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...defaultAnchorPositions,
        updateAnchorTrigger: state.updateAnchorTrigger,
      };
      break;
    default:
      return state;
  }
};
