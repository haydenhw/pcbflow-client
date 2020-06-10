import React from 'react';
import ReactDOM from 'react-dom';
import Modules from './Modules';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Modules />, div);
  ReactDOM.unmountComponentAtNode(div);
});
