// *refactor for readability
export function getUnmetDependencyIds(modules = [], selectedModuleDependencies) {
  const onBoardIds = modules.map(module => module.id);
  const unmetDependencyIds = selectedModuleDependencies.filter(id => onBoardIds.indexOf(id) === -1);

  return unmetDependencyIds;
}

export function getUnmetDependencies(moduleList, onBoardModules, selectedModuleDependencies) {
  const unmetDependencyIds = getUnmetDependencyIds(onBoardModules, selectedModuleDependencies);
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.id) !== -1)
  );

  return unmetDependencies;
}

export function getDependencyDiff(moduleArray) {
  const filterdArray = moduleArray.map((module, index) => {
    const { id, dependencies, text } = module;
    return {
      index,
      id,
      text,
      dependencies,
      metDependencies: [],
    };
  });

  filterdArray.forEach((module) => {
    const { dependencies, metDependencies, index } = module;

    filterdArray.forEach((otherModule) => {
      if (
        (dependencies.indexOf(otherModule.id) !== -1) &&
        (metDependencies.indexOf(otherModule.id) === -1)
      ) {
        metDependencies.push(otherModule.id);
      }
    });
  });

  return filterdArray;
}

export function areDependenciesMet(dependencies, metDependencies) {
  return dependencies ? (dependencies.length === metDependencies.length) : true;
}

export function findUnmetDependency(dependencyDiffArray) {
  return dependencyDiffArray.find(element => (
    !areDependenciesMet(element.dependencies, element.metDependencies)
  ));
}

export function getNewDependencyData(modules) {
  const dependencyDiffArray = getDependencyDiff(modules);
  const nextParentToDisplay = findUnmetDependency(dependencyDiffArray);
  const nullData = {
    dependencies: [],
    index: null,
    text: null,
    moduleName: null,
  };

  if (nextParentToDisplay) {
    return {
      visibilityMode: 'DEPENDENCY',
      dependencyData: nextParentToDisplay,
    };
  }

  return {
    visibilityMode: 'ALL',
    dependencyData: nullData,
  };
}
