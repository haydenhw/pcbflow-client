import React from 'react';
import ReactDOM from 'react-dom';
import PopupMenuContent from './PopupMenuContent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopupMenuContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
