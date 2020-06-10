import React from 'react';
import ReactDOM from 'react-dom';
import TopNavbarSaveButton from './TopNavbarSaveButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavbarSaveButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
