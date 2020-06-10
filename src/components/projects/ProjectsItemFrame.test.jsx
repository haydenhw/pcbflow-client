import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsItemFrame from './ProjectsItemFrame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectsItemFrame />, div);
  ReactDOM.unmountComponentAtNode(div);
});
