import getPerimeterSide from 'helpers/getPerimeterSide';

function buildCoordinateData(selectedModuleProps, topLeftAnchor, boardSpecs) {
  const {
    boundToSideIndex,
    x,
    y,
    width,
    height,
  } = selectedModuleProps;

  return {
    boundToSide: getPerimeterSide(boundToSideIndex),
    moduleX: x,
    moduleY: y,
    moduleWidth: width,
    moduleHeight: height,
    topLeftAnchorX: topLeftAnchor.x,
    topLeftAnchorY: topLeftAnchor.y,
    boardWidth: boardSpecs.width,
    boardHeight: boardSpecs.height,
  };
}

export default function bindToPerimeter(selectedModuleProps, topLeftAnchor, boardSpecs) {
  const cd = buildCoordinateData(selectedModuleProps, topLeftAnchor, boardSpecs);
  switch (cd.boundToSide) {
    case 'bottom':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY + cd.boardHeight - cd.moduleHeight,
      };
    case 'left':
      return {
        x: cd.topLeftAnchorX + 0.5 * (cd.moduleHeight - cd.moduleWidth),
        y: cd.moduleY,
      };
    case 'top':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY,
      };
    case 'right':
      return {
        x: cd.topLeftAnchorX + cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
        y: cd.moduleY,
      };
    default:
      return {
        x: cd.moduleX,
        y: cd.moduleY,
      };
  }
}
