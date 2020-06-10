import React from 'react';
import ReactDOM from 'react-dom';
import SideBarDimensionInput from './SideBarDimensionInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarDimensionInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
