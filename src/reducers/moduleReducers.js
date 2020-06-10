import * as actions from '../actions/indexActions';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

export const moduleList = (state = [], action) => {
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
    return {
      modules: action.modules,
    };
  }

  return state;
};

export const draggingModule = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_DRAGGING_MODULE:
      return action.moduleData;

    case actions.UPDATE_MODULE_IMAGE:
      const { imageNode } = action.moduleData;
      return ({
        ...state,
        imageNode,
      });
    default:
      return state;
  }
};

export const selectedModule = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_SELECTED_MODULE:
      return action.moduleData;
    case actions.UPDATE_MODULE_POSITION:
      const { x, y } = action.modulePosition;
      return {
        ...state,
        x,
        y,
      };
    case actions.ROTATE_SELECTED_MODULE:
      const {
        rotation,
        boundToSideIndex,
        parentGroupX,
        parentGroupY,
        innerGroupX,
        innerGroupY,
        width,
        height,
        index,
      } = action.rotationData;

      return {
        ...state,
        boundToSideIndex,
        innerGroupX,
        innerGroupY,
        rotation,
        x: parentGroupX,
        y: parentGroupY,
      };
    default:
      return state;
  }
};

export const currentProjectModules = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      case actions.START_TUTORIAL:
       return [];
      case actions.POST_PROJECT_SUCCESS:
      case actions.SET_ACTIVE_PROJECT:
        return action.project.modules;
      case actions.PUSH_NEW_MODULE:
        return [...state, action.module];
      case actions.UPDATE_MODULE_POSITION:
        return state.map((module, i) => {
          const { x, y, index } = action.modulePosition;
          const updatedModuleProps = {
            ...module,
            x,
            y,
          };
          return i === index ? updatedModuleProps : module;
        });

      case actions.UPDATE_MODULE_STROKE:
        return state.map((module, i) => {
          const { stroke, index } = action.moduleStroke;
          const updatedModuleProps = {
            ...module,
            stroke,
          };
          return i === index ? updatedModuleProps : module;
        });

      case actions.UPDATE_MET_DEPENDECIES:
        return state.map((module, i) => {
          const { metDependencies, index } = action.metDependencies;
          const updatedModuleProps = {
            ...module,
            metDependencies,
          };
          return i === index ? updatedModuleProps : module;
        });

      case actions.UPDATE_MODULE_IMAGE:
        return state.map((module, i) => {
          const { imageNode, index } = action.moduleData;
          const updatedModuleProps = {
            ...module,
            imageNode,
          };

          return i === index ? updatedModuleProps : module;
        });

      case actions.ROTATE_SELECTED_MODULE:
        const {
          rotation,
          boundToSideIndex,
          parentGroupX,
          parentGroupY,
          innerGroupX,
          innerGroupY,
          width,
          height,
          index,
        } = action.rotationData;

        return state.map((module, i) => {
          const updatedModuleProps = {
            ...module,
            boundToSideIndex,
            innerGroupX,
            innerGroupY,
            rotation,
            x: parentGroupX,
            y: parentGroupY,
          };

          return i === index ? updatedModuleProps : module;
        });

      case actions.DELETE_SELECTED_MODULE:
        const newState = [
          ...state.slice(0, action.moduleIndex),
          ...state.slice(action.moduleIndex + 1),
        ];
        return newState;

      default:
        return state;
    }
  }
};
