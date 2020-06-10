import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsContainer from './ProjectsContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
