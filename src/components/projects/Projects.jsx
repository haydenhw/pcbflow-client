import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Logo from 'components/logo/Logo';
import TopNavbarButton from 'components/top-navbar/TopNavbarButton';
import ProjectsList from './ProjectsList';
import ProjectsAddButton from './ProjectsAddButton';

import 'components/top-navbar/top-navbar-styles/_TopNavbar.scss';
import './projects-styles/_floatGrid.scss';
import './projects-styles/_Projects.scss';

export default function Projects({ handleHomeButtonClick }) {
  return (
    <div>
        <nav>
          <div className="project-nav-top">
            <Logo className="project-nav-logo" />
            <TopNavbarButton
              className="nav-button home-button"
              handleClick={handleHomeButtonClick}
              icon={<span className="icon-home" />}
              text=""
            />
          </div>
          <div className="project-nav-bottom">
            <div className="row-project">
              <div className="col-wrapper">
                <div>
                  <ProjectsAddButton />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <ProjectsList />
    </div>
  );
}

Projects.propTypes = {
  handleLinkClick: PropTypes.func,
};
