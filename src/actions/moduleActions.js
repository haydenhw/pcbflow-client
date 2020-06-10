import { projectsUrl } from '../config/endpointUrls';
import * as actions from 'actions/indexActions';

export const PUSH_NEW_MODULE = 'PUSH_NEW_MODULE';
export const pushNewModule = module => ({
  type: 'PUSH_NEW_MODULE',
  module,
});

export const pushToCurrentProjectModules = module => (dispatch, getState) => {
  const { step, isTutorialActive } = getState().tutorial;

  if (isTutorialActive) {
    switch (step) {
      case 4:
      case 7:
      case 10:
        dispatch(actions.updateDisabledIconExceptions(null));
        setTimeout(() => dispatch(actions.toggleModal()), 700);
        break;
      case 13:
        dispatch(actions.completeTodo(module.id));
        break;
      default:
          // do nothing
    }
  }

  dispatch(actions.pushNewModule(module));
};

export const CHANGE_DRAGGING_MODULE = 'CHANGE_DRAGGING_MODULE';
export const changeDraggingModule = moduleData => ({
  type: 'CHANGE_DRAGGING_MODULE',
  moduleData,
});

export const UPDATE_MODULE_POSITION = 'UPDATE_MODULE_POSITION';
export const updateModulePosition = modulePosition => ({
  type: 'UPDATE_MODULE_POSITION',
  modulePosition,
});

export const UPDATE_MODULE_FILL = 'UPDATE_MODULE_FILL';
export const updateModuleFill = moduleFill => ({
  type: 'UPDATE_MODULE_FILL',
  moduleFill,
});

export const UPDATE_MODULE_STROKE = 'UPDATE_MODULE_STROKE';
export const updateModuleStroke = moduleStroke => ({
  type: 'UPDATE_MODULE_STROKE',
  moduleStroke,
});

export const UPDATE_MODULE_IMAGE = 'UPDATE_MODULE_IMAGE';
export const updateModuleImage = moduleData => ({
  type: 'UPDATE_MODULE_IMAGE',
  skipPrevState: true,
  moduleData,
});

export const UPDATE_MET_DEPENDECIES = 'UPDATE_MET_DEPENDECIES';
export const updateMetDependencies = metDependencies => ({
  type: 'UPDATE_MET_DEPENDECIES',
  skipPrevState: true,
  metDependencies,
});

export const UPDATE_SELECTED_MODULE = 'UPDATE_SELECTED_MODULE';
export const updateSelectedModule = moduleData => ({
  type: 'UPDATE_SELECTED_MODULE',
  moduleData,
});

export const DELETE_SELECTED_MODULE = 'DELETE_SELECTED_MODULE';
export const deleteSelectedModule = (moduleIndex) => (dispatch, getState) => {
  const currentModulesLength = getState().currentProjectModules.present.length;

  if (currentModulesLength === 1) {
    dispatch(actions.updateBoardStroke(null));
  }

  dispatch({
    type: 'DELETE_SELECTED_MODULE',
    moduleIndex,
  });
}

export const ROTATE_SELECTED_MODULE = 'ROTATE_SELECTED_MODULE';
export const rotateSelectedModule = rotationData => ({
  type: 'ROTATE_SELECTED_MODULE',
  rotationData,
});

export const SAVE_MODULE_POSITION_SUCCESS = 'SAVE_MODULE_POSITION_SUCCESS';
export const saveModulePositionSuccess = modules => ({
  type: 'SAVE_MODULE_POSITION_SUCCESS',
  modules,
});

// TODO delete this
export function saveModulePosition(
  url,
  { method: PUT },
  ) {
  return (dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      dispatch({
        type: 'SAVE_MODULE_POSITION_SUCCESS',
        data });
    })
    .catch((err) => {
      console.error(err);
    });
  };
}
