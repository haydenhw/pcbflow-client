import React from 'react';
import ReactDOM from 'react-dom';
import ModuleInventoryList from './ModuleInventoryList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModuleInventoryList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
