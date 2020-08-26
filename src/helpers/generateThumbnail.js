import Konva from 'konva';
// TODO Just move this logic into  getStageFromJSON  in ProjectsItemFrame
function createTempElement(elementId) {
  return () => {
    const tempElement = document.createElement('div');
    tempElement.id = elementId;

    document.body.appendChild(tempElement);

    return tempElement;
  };
}

// TODO no need for this to be created with an HOC
export const createTempContainer = createTempElement('container');

export function getCroppedStage(boardLayer) {
  const boardClone = boardLayer.clone();
  const topLeftAnchorX = boardClone.find('.topLeft')[0].attrs.x;
  const topLeftAnchorY = boardClone.find('.topLeft')[0].attrs.y;
  const boardCloneAttrs = boardClone.find('.boardGroup')[0].attrs;
  const tempContainer = createTempContainer();
  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20,
    container: 'container'
  });

  document.body.removeChild(tempContainer);

  boardCloneAttrs.x = 10 - topLeftAnchorX;
  boardCloneAttrs.y = 10 - topLeftAnchorY;

  return {
    width: croppedStage.getStage().attrs.width,
    height: croppedStage.getStage().attrs.height,
    node: croppedStage.add(boardClone),
  };
}

export default function generateThumbnail(boardLayer) {
  const croppedStage = getCroppedStage(boardLayer);
  return croppedStage.node.toJSON();
}
