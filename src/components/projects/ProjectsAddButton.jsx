// move the markup for this component to parent and delete
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import './projects-styles/_ProjectsAddButton.scss';

export default class ProjectsAddButton extends Component {
  handleClick() {
    store.dispatch(actions.createNewProject());
  }

  render() {
    return (
      <div className="project-add-button button" onClick={this.handleClick} role="button">
        <FontAwesome name="fa-plus" className="fa-plus" />
        <span className="project-add-button-text">Project</span>
      </div>
    );
  }
}
