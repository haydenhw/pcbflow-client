import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsItem from './ProjectsItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
