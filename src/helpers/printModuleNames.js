export function printModuleNames(thumbnail) {
  const children = JSON.parse(thumbnail).
    children[0].
    children[0].
    children[5].
    children.
    forEach(module => console.log(module.children[0].attrs.text));
}

export function getModulesObject(thumbnail) {
  const children = JSON.parse(thumbnail).
    children[0].
    children[0].
    children[5].
    children.
    forEach(module => console.log(module.children[0]));
}

function serializedModules(stageRef) {
  const jsonStage = stageRef.getStage().toJSON();
  const children = (JSON.parse(jsonStage).children[1].children[0]);
  const childrenClone = Object.assign({}, children);
  const keysLength = Object.keys(childrenClone).length;

  if (keysLength > 0) {
    const deeperChildren = childrenClone.children[5].children;
    const finalJSON = JSON.stringify(deeperChildren);
    return finalJSON;
  }
}
