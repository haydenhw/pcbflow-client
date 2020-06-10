import React from 'react';
import ReactDOM from 'react-dom';
import SideBarIcon from './SideBarIcon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarIcon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
