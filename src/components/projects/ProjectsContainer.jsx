import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Modal from 'components/modal/Modal';
import Projects from './Projects';

export class ProjectContainer extends Component {
  componentWillMount() {
    const { shouldRenderModal } = this.props;

    if (shouldRenderModal) {
      store.dispatch(actions.toggleModal());
    }
  }

  routeToHome() {
    hashHistory.push('/');
  }

  renderModal() {
    const { shouldRenderModal, modalProps } = this.props;

    if (shouldRenderModal && modalProps) {
      const { projectId, projectName } = modalProps;

      return (
        <Modal
          handleCloseButtonClick={() => store.dispatch(actions.toggleModal())}
          handleLeftButtonClick={() => store.dispatch(actions.toggleModal())}
          handleRightButtonClick={() => store.dispatch(actions.deleteProject(projectId))}
          leftButtonText="Cancel"
          rightButtonText="Delete"
          shouldRenderLeftButton
          title="Confirm Delete"
          text={`Are you sure you want to delete project "${projectName}"  ?`}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <Projects handleHomeButtonClick={this.routeToHome} />
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalProps: state.modal.modalProps,
  shouldRenderModal: state.modal.shouldRenderModal,
});

export default connect(mapStateToProps)(ProjectContainer);

ProjectContainer.propTypes = {
  shouldRenderModal: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
};
