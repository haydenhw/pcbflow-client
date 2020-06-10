import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import LoadingOverlay from 'react-loading-overlay';

import { moveSampleProjectFront } from 'helpers/projectHelpers';
import { getJWT, getUserId } from 'helpers/users';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/_floatGrid.scss';
import './projects-styles/_ProjectsItemFrame.scss';

class ProjectsList extends Component {
  constructor() {
    super();
    this.state = {
      hasFetched: false,
      projects: [],
    }
  }

  static defaultProps = {
    projects: [],
  }

  componentDidMount() {
    const jwt = getJWT();
    let userId = getUserId();

    if (true || jwt) {
    store.dispatch(actions.fetchProjects(userId, jwt))
      .then((projects) => {
        if (projects) {
          this.setState({ projects, hasFetched: true });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, jwt } = this.props;

    if (projects !== prevProps.projects) {
      this.setState({ projects, hasFetched: true });
    }

    // TODO remove this
    if (jwt !== prevProps.jwt) {
      console.log('hello')
    }
  }

  confirmDelete = (projectId, projectName) => () => {
    store.dispatch(actions.confirmProjectDelete({
      projectId,
      projectName,
    }));
  }

  render() {
    const { projects } = this.state;

    if(!this.state.hasFetched) {
      return <LoadingOverlay
        active={true}
        spinner
        text='Setting up...'
      >
        <div className="overlay"/>
      </LoadingOverlay>
    }

    const orderedProjects = moveSampleProjectFront(projects);
    const projectsList = orderedProjects.map((project) => {
      const { thumbnail } = project.boardSpecs;
      return (
        <ProjectsItemFrame
          key={shortid.generate()}
          projects={projects}
          projectName={project.name}
          projectId={project._id}
          thumbnail={thumbnail}
          confirmDelete={this.confirmDelete(project._id, project.name)}
        />
      );
    });

    return (
      <div className="thumbnail-row">
        <div className="row-project">
          <div className="col-wrapper card">
            {projectsList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.items,
});

export default connect(mapStateToProps)(ProjectsList);
ProjectsList.propTypes = {
  projects: PropTypes.array,
};
