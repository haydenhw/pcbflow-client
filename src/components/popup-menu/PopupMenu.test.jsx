import React from 'react';
import ReactDOM from 'react-dom';
import PopupMenu from './PopupMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopupMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
