import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

Array.prototype.diff = function (a) {
  return this.filter(i => a.indexOf(i) < 0);
};

function adjustDimesionsForRotation(node) {
  const rotation = node.find('.innerGroup')[0].attrs.rotation;
  const adjustedObj = {};

  if (rotation === 90 || rotation === 270) {
    const { x, y, width, height } = node.attrs;
    const halfDiff = (height - width) / 2;
    adjustedObj.x = x - halfDiff;
    adjustedObj.y = y + halfDiff;
    adjustedObj.width = height;
    adjustedObj.height = width;

    return adjustedObj;
  }
  return node.attrs;
}

export default function enforceRules(nodeArray, perimeterNode, ruleBreakingAction, ruleFollowingAction) {
  const collidingNodes = checkCollision(nodeArray, adjustDimesionsForRotation);
  const outOfBoundsNodes = checkExceedsPerimter(nodeArray, perimeterNode, adjustDimesionsForRotation);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes];
  const ruleFollowingNodes = nodeArray.diff(ruleBreakingNodes);

  ruleFollowingAction(perimeterNode);
  ruleBreakingNodes.forEach(node => ruleBreakingAction(node));
  ruleFollowingNodes.forEach(node => ruleFollowingAction(node));
}
