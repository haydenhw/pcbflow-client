import React from 'react';
import ReactDOM from 'react-dom';
import SideBarIconList from './SideBarIconList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarIconList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
