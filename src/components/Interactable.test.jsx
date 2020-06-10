import React from 'react';
import ReactDOM from 'react-dom';
import Interactable from './Interactable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Interactable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
