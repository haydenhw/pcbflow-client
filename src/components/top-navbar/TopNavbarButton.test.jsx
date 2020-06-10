import React from 'react';
import ReactDOM from 'react-dom';
import TopNavbarButton from './TopNavbarButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavbarButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
