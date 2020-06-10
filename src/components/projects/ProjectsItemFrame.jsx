import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import { createTempContainer } from 'helpers/generateThumbnail';

import DeleteButton from './ProjectsDeleteButton';

import './projects-styles/_ProjectsItemFrame.scss';
import './projects-styles/_floatGrid.scss';

function fectchProject(projects, projectId) {
  store.dispatch(actions.setActiveProject(projects, projectId, true));
}

const loadImage = imgSrc => (
  new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = imgSrc;
  })
);

const loadImages = imgSrcs => {
  return Promise.all(imgSrcs.map(loadImage));
}

const getStageFromJSON = (json) =>  {
  const tempContainer = createTempContainer();
  const stage = json
    ? Konva.Node.create(json, 'container')
    : null;

  document.body.removeChild(tempContainer);

  return stage;
}

export default class ProjectsItemFrame extends Component {
  constructor() {
    super();
    this.state = {
      thumbnailDataUrl: null,
    }
  }

  componentDidMount() {
    const { thumbnail } = this.props;
    const stage = getStageFromJSON(thumbnail);
    const stageImages = stage.find('.image');
    const stageImagePaths = stageImages
      .map(image => image.attrs.src);

    loadImages(stageImagePaths)
      .then((imageNodes) => {
        imageNodes.forEach((imageNode, i) => {
          stageImages[i].image(imageNode);
        });
        stage.draw();
        this.setState({ thumbnailDataUrl: stage.toDataURL() });
      });
  }

  render() {
    return (
      <div className="col3-project">
        <div className="project-card">
          <div
            className="thumbnail-image"
            style={{ backgroundImage: `url(${this.state.thumbnailDataUrl || ''})`}}
            onClick={() => fectchProject(this.props.projects, this.props.projectId)}
            role="buttonplaylistUrl"
          >
          </div>
          <div className="title-bar">
            <div className="title">
              {this.props.projectName}
            </div>
            <DeleteButton handleClick={this.props.confirmDelete} />
          </div>
        </div>
      </div>
    );
  }
}

ProjectsItemFrame.propTypes = {
  projectId: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};
