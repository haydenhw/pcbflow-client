import * as actions from 'actions/indexActions';
import { modulesData } from '../config/modulesData';

const defaultIconsVibility = {
  mode: 'ALL',
  dependencies: [],
};

export const iconVisibity = (state = defaultIconsVibility, action) => {
  switch (action.type) {
    case actions.UPDATE_ICON_VISBILITY:
      return {
        ...state,
        mode: action.mode,
      };
    case actions.UPDATE_CURRENT_DEPENDENCIES:
      const { dependencies, text, index } = action.dependencyData;
      return {
        ...state,
        dependencies,
        index,
        moduleName: text,
      };
    default:
      return state;
  }
};

export const shouldRenderSideBar = (state = false, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOULD_RENDER_SIDEBAR:
      return action.bool;
    default:
      return state;
  }
};

export const moduleData = (state = modulesData, action) => {
  switch (action.type) {
    case actions.TOGGLE_HAS_TOOLTIP:
      return state.map((module) => {
        const updatedModuleProps = {
          ...module,
          hasTooltip: false,
        };
        return action.id === module.id ? updatedModuleProps : module;
      });
    default:
      return state;
  }
};

