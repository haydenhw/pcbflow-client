import camelCase from 'camel-case';

export const hasSampleProject = projects => (
  Boolean(
    projects.find((project) => project.isSampleProject)
  )
);

export const addSampleProject = (projects, sampleProject) => {
  if (hasSampleProject(projects)) {
    return projects;
  }

  return [sampleProject, ...projects];
}

export const getSampleProjectWithId = (sampleProject, id) => (
  Object.assign({}, sampleProject, { ownerId: id })
);

export const getProjectById = (projects, projectId) => (
  projects.find(project => projectId === project._id)
);

export const getIdFromUrl = (url) => {
  const splitUrl = url.split('/');
  return splitUrl[splitUrl.length -1];
};

export const isDesignRoute = (url) => {
  return RegExp('design').test(url);
};

const getSampleProjectIndex = projects => (
    projects.findIndex((project) => project.isSampleProject)
);

const removeSampleProject = projects => (
  projects.filter((project) => (
    !project.isSampleProject
  ))
);

export const moveSampleProjectFront = (projects=[]) => {
  const sampleProjectIndex = getSampleProjectIndex(projects);
  const withoutSampleProject = removeSampleProject(projects);

  if (sampleProjectIndex < 0) {
    return projects;
  }

  if (projects.length === 0) {
    return [];
  }

  return [projects[sampleProjectIndex], ...withoutSampleProject ];
}


// key transformations
const transformKeys = (transformer) => (obj) =>
  Object.keys(obj).reduce((c, key) => (c[transformer(key)] = obj[key], c), {});

export const underscoreIdKey = (obj) => {
  obj._id = String(obj.id);
  delete obj.id;
  return obj;
}

export const boardToBoardSpecs = (obj) => {
  obj.boardSpecs = obj.board;
  delete obj.board;
  return obj;
}

const moduleIdToModule = (obj) => {
  obj._id = obj.id;
  obj.id = obj.moduleId
  delete obj.moduleId;
  return obj;
}

const transformProjectKeys = (transformer) => (projects) => {
  return projects.map(p => {
    p = transformer(p);
    p.modules = p.modules.map(transformer);
    p.modules = p.modules.map(moduleIdToModule)
    return p;
  });
}

const camelToSnake = (string) => {
  return string.replace(/[\w]([A-Z])/g, function (m) {
    return m[0] + "_" + m[1];
  }).toLowerCase();
}

export const snakecaseRequestKeys = (project) => {
  let p = project;
  p.boardSpecs = snakecaseKeys(p.boardSpecs)
  p.modules = p.modules.map(snakecaseKeys);
  p = snakecaseKeys(p);
  return p;
}

const underscoreProjectIds = transformProjectKeys(underscoreIdKey);
const snakecaseKeys = transformKeys(camelToSnake);
export const camelizeObject = transformKeys(camelCase);
export const camelizeProjectKeys = transformProjectKeys(camelizeObject);

const removeKey = (obj, propToDelete) => {
  const {[propToDelete]: deleted, ...objectWithoutDeletedProp} = obj;
  return objectWithoutDeletedProp;
};


