import React from 'react';
import ReactDOM from 'react-dom';
import PopupMenuTrigger from './PopupMenuTrigger';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopupMenuTrigger />, div);
  ReactDOM.unmountComponentAtNode(div);
});
