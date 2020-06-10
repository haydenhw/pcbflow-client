import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsAddButton from './ProjectsAddButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsAddButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
