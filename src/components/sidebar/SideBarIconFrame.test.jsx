import React from 'react';
import ReactDOM from 'react-dom';
import SideBarIconFrame from './SideBarIconFrame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarIconFrame />, div);
  ReactDOM.unmountComponentAtNode(div);
});
