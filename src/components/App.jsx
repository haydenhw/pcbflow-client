import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import store from 'reduxFiles/store';
import { fetchProjects, handleExistingUserVisit, handleNewUserVisit } from 'actions/indexActions';
import { isJWTExpired, getUser, getJWT, clearUser, clearJWT, getUserId, createNewUser  } from 'helpers/users';

// *move this to helpers
const doesUserExist = () => Boolean(getUser());

export default class App extends Component {
  componentDidMount() {
    const jwt = getJWT();
    const user = getUser();
    let userId = getUserId();

    if (userId) {
      fetchProjects(userId);
    } else {
      userId = createNewUser();
      fetchProjects(userId);
    }

    // doesUserExist()
    //   ? store.dispatch(handleExistingUserVisit(jwt, user))
    //   : store.dispatch(handleNewUserVisit());
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
};
