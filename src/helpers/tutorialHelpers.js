const getProjects = state => state.projects.items;

export const getTutorialProject = state => (
  getProjects(state).find((project) => project.isTutorialProject)
);
