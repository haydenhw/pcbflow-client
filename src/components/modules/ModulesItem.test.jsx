import React from 'react';
import ReactDOM from 'react-dom';
import ModulesItem from './ModulesItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModulesItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
