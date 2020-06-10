import React from 'react';
import ReactDOM from 'react-dom';
import Rect from './Rect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rect />, div);
  ReactDOM.unmountComponentAtNode(div);
});
