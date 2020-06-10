import React from 'react';
import ReactDOM from 'react-dom';
import InlineEdit from './InlineEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InlineEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
