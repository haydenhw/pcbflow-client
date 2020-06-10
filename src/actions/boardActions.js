export const TRIGGER_THUMBNAIL_UPDATE = 'TRIGGER_THUMBNAIL_UPDATE';
export const triggerThumbnailUpdate = () => ({
  type: 'TRIGGER_THUMBNAIL_UPDATE',
});

export const TRIGGER_ANCHOR_UPDATE = 'TRIGGER_ANCHOR_UPDATE';
export const triggerAnchorUpdate = () => ({
  type: 'TRIGGER_ANCHOR_UPDATE',
});

export const TRIGGER_BOARD_UPDATE = 'TRIGGER_BOARD_UPDATE';
export const triggerBoardUpdate = () => ({
  type: 'TRIGGER_BOARD_UPDATE',
});

export const UPDATE_ANCHOR_POSITIONS = 'UPDATE_ANCHOR_POSITIONS';
export const updateAnchorPositions = positions => ({
  type: 'UPDATE_ANCHOR_POSITIONS',
  positions,
});

export const UPDATE_BOARD_POSITION = 'UPDATE_BOARD_POSITION';
export const updateBoardPosition = position => ({
  type: 'UPDATE_BOARD_POSITION',
  position,
});

export const UPDATE_BOARD_DIMENSIONS = 'UPDATE_BOARD_DIMENSIONS';
export const updateBoardDimensions = dimensions => ({
  type: 'UPDATE_BOARD_DIMENSIONS',
  dimensions,
});

export const UPDATE_BOARD_STROKE = 'UPDATE_BOARD_STROKE';
export const updateBoardStroke = boardStroke => ({
  type: 'UPDATE_BOARD_STROKE',
  boardStroke,
});

export const UPDATE_BOARD_THUMBNAIL = 'UPDATE_BOARD_THUMBNAIL';
export const updateThumbnail = (thumbnail, projectId) => ({
  type: 'UPDATE_BOARD_THUMBNAIL',
  thumbnail,
  projectId,
});
