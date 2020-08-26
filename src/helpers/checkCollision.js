export default function checkCollision(nodeArray, callback) {
  const collidingNodes = [];

  nodeArray.forEach((node) => {
    let nodeBox = node.attrs ? node.attrs : node;
    nodeBox = callback ? callback(node) : nodeBox;
    const { x, y, width, height } = nodeBox;
    const nodeLeft = x;
    const nodeRight = x + width;
    const nodeTop = y;
    const nodeBottom = y + height;

    nodeArray.forEach((otherNode) => {
      let otherBox = otherNode.attrs ? otherNode.attrs : otherNode;
      otherBox = callback ? callback(otherNode) : otherBox;

      if (JSON.stringify(nodeBox) !== JSON.stringify(otherBox)) {
        const { x, y, width, height } = otherBox;
        const otherLeft = x;
        const otherRight = x + width;
        const otherTop = y;
        const otherBottom = y + height;

        const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
        const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

        if (collideHoriz && collideVert) {
          collidingNodes.push(otherNode);
        }
      }
    });
  });

  return collidingNodes.length > 1 ? collidingNodes : [];
}
