import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module'
import ReactGA from 'react-ga';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';

import App from 'components/App';
import DesignTool from 'components/design-tool/DesignTool';
import ProjectsContainer from 'components/projects/ProjectsContainer';
import LandingPage from 'components/landing-page/LandingPage';

import './styles/_reset.scss';
import './styles/index.scss';
import './styles/icons/style.css'

if (process.env.NODE_ENV === 'production') {
  TagManager.initialize({
    gtmId: 'GTM-KJWS7WT'
  });
  ReactGA.initialize('UA-160393427-2');
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/design/:projectId" component={DesignTool} />
        <Route path="/projects" component={ProjectsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
