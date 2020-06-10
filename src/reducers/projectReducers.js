import * as actions from '../actions/indexActions';
import doesModifyProject from 'helpers/doesModifyProject';

const defaultProjectState = {
  isFetching: false,
  hasFetched: false,
  isInitialLoad: true,
  isSaving: null,
  items: [],
  saveProjectTrigger: false,
  updateThumbnailTrigger: false,
};

export const projects = (state = defaultProjectState, action) => {
  switch (action.type) {
    case actions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        items: state.items.filter(project => project._id !== action.projectId),
      };
    case actions.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.projects,
      };
    case actions.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case actions.POST_PROJECT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.project],
      };
    case actions.UPDATE_BOARD_THUMBNAIL: {
      const updatedProjects = state.items.map(project => {
        if (project._id === action.projectId) {
          const updatedBoardSpecs = Object.assign({}, { ...project.boardSpecs }, { thumbnail: action.thumbnail })
          const updatedProject = Object.assign({}, project, { boardSpecs: updatedBoardSpecs });
          return updatedProject;
        }

        return project;
      });

      return {
        ...state,
        items: updatedProjects,
      }
    }
    case actions.UPDATE_PROJECT_NAME: {
      const updatedProjects = state.items.map(project => {
        if (project._id === action.projectId) {
          const updatedProject = Object.assign({}, project, { name: action.newName });
          return updatedProject;
        }

        return project;
      });

      return {
        ...state,
        items: updatedProjects,
        saveProjectTrigger: !state.saveProjectTrigger,
      }
    }
    case actions.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isInitialLoad: false,
      };
  }

  if (doesModifyProject(action)) {
    const updatedSaveProjectTrigger = action.type === actions.UPDATE_MODULE_FILL
      ? state.saveProjectTrigger
      : !state.saveProjectTrigger;

    return {
      ...state,
      saveProjectTrigger: updatedSaveProjectTrigger,
      updateThumbnailTrigger: !state.updateThumbnailTrigger,
    };
  }

  return state;
};

const defaultProjectInfo = {
  id: null,
  name: '',
  price: '$15.00',
};

export const currentProjectInfo = (state = defaultProjectInfo, action) => {
  switch (action.type) {
    case actions.POST_PROJECT_SUCCESS:
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
    case actions.SET_ACTIVE_PROJECT:
      return {
        ...state,
        id: action.project._id,
        name: action.project.name,
      };
      break;
    case actions.UPDATE_PROJECT_NAME:
      return {
        ...state,
        name: action.name,
      };
      break;
    case actions.UPDATE_PROJECT_PRICE:
      return {
        ...state,
        price: action.price,
      };
      break;
    case actions.UPDATE_LAST_SAVED_TIME:
      return {
        ...state,
        timeLastSaved: action.time,
      };
      break;
    default:
      return state;
  }
};
