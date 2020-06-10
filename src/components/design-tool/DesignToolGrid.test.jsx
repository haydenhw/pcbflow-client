import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolGrid from './DesignToolGrid';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolGrid />, div);
  ReactDOM.unmountComponentAtNode(div);
});
