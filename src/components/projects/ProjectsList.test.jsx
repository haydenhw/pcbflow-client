import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsList from './ProjectsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
