export const getKonvaChildByIndex = index => konvaNode => konvaNode.children[index];

export const getKonvaParentByName = (name) => (konvaNode) => {
  if (konvaNode.getName() === name) {
    return konvaNode;
  }

  return getKonvaParentByName(name)(konvaNode.getParent());
}
