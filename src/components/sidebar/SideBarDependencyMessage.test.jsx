import React from 'react';
import ReactDOM from 'react-dom';
import SideBarDependencyMessage from './SideBarDependencyMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarDependencyMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
