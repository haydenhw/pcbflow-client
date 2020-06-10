import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';
import './_RootModal.scss';

export default class RootModal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  // componentWillUpdate if using redux
  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    const { children } = this.props;

    ReactDOM.render(
      <Provider store={store}>
        <div>{children}</div>
      </Provider>,
      this.modalTarget,
    );
  }

  render() {
    return <noscript />;
  }
}

RootModal.propTypes = {
  children: PropTypes.object.isRequired,
};
