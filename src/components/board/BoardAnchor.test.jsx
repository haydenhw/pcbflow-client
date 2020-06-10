import React from 'react';
import ReactDOM from 'react-dom';
import BoardAnchor from './BoardAnchor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardAnchor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
