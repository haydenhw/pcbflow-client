import React from 'react';
import ReactDOM from 'react-dom';
import TopNavbarEditableText from './TopNavbarEditableText';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavbarEditableText />, div);
  ReactDOM.unmountComponentAtNode(div);
});
