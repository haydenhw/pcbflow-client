import React from 'react';
import ReactDOM from 'react-dom';
import RootModal from './RootModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RootModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
