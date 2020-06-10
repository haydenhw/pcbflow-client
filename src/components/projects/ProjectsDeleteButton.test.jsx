import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsDeleteButton from './ProjectsDeleteButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsDeleteButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
