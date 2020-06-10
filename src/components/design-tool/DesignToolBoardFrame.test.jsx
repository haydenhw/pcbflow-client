import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolBoardFrame from './DesignToolBoardFrame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolBoardFrame />, div);
  ReactDOM.unmountComponentAtNode(div);
});
