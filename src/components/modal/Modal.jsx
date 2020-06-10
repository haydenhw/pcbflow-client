import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import RootModal from './RootModal';
import './_Modal.scss';

export default class Modal extends Component {

  componentDidMount() {
    const { handleDidMount } = this.props;

    if (handleDidMount) {
      handleDidMount();
    }
  }

  componentDidUpdate() {
    const { handleDidUpdate } = this.props;

    if (handleDidUpdate) {
      handleDidUpdate();
    }
  }

  renderLeftButton() {
    const { leftButtonText, handleLeftButtonClick, shouldRenderLeftButton } = this.props;

    if (shouldRenderLeftButton) {
      return (
        <button
          className="modal-button-left modal-button"
          onClick={handleLeftButtonClick}
        >
          {leftButtonText}
        </button>
      );
    }

    return null;
  }

  renderImage() {
    const { image } = this.props;

    if (image) {
      const { alt, src } = image;
      return (
        <img
          className={`modal-image ${image.class}`}
          src={src}
          alt={alt}
        />
      );
    }

    return null;
  }

  renderList() {
    const { list1, list2 } = this.props;

    if (list1 && !list2) {
      const items = list1.map(item => <li key={shortid.generate()} >{item}</li>);

      return (
        <div className="list-wrapper">
          <ul>{items}</ul>
        </div>
      );
    }

    if (list1 && list2) {
      const items1 = list1.map(item => <li key={shortid.generate()} >{item}</li>);
      const items2 = list2.map(item => <li key={shortid.generate()} >{item}</li>);

      return (
        <div className="list-wrapper">
          <ul>{items1}</ul>
          <ul>{items2}</ul>
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      handleCloseButtonClick,
      handleRightButtonClick,
      modalClass,
      rightButtonClass,
      rightButtonText,
      text,
      title,
    } = this.props;

    const rightButtonClassName = `modal-button ${rightButtonClass}`;
    return (
      <RootModal>
        <div className={`modal-content ${modalClass}`}>
          <span className="modal-close" onClick={handleCloseButtonClick} role="button">&times;</span>
          <div className="modal-scroll-wrapper">
            <h2 className="modal-title">{title}</h2>
            {this.renderImage()}
            <div className="modal-text-parent">
              <div className="modal-text-child">
                {text.split('\n').map(line => <p key={shortid.generate()}>{line}</p>)}
              </div>
            </div>
            {this.renderList()}
          </div>
          <div className="modal-button-wrapper">
            {this.renderLeftButton()}
            <button
              className={`modal-button-right modal-button ${rightButtonClassName}`}
              onClick={handleRightButtonClick}
            >
              {rightButtonText}
            </button>
          </div>
        </div>
      </RootModal>
    );
  }
}

Modal.propTypes = {
  handleCloseButtonClick: PropTypes.func.isRequired,
  handleDidMount: PropTypes.func,
  handleDidUpdate: PropTypes.func,
  handleLeftButtonClick: PropTypes.func.isRequired,
  handleRightButtonClick: PropTypes.func.isRequired,
  image: PropTypes.object,
  leftButtonText: PropTypes.string.isRequired,
  list1: PropTypes.array,
  list2: PropTypes.array,
  modalClass: PropTypes.string,
  rightButtonClass: PropTypes.string,
  rightButtonText: PropTypes.string.isRequired,
  shouldRenderLeftButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
};
