import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolStage from './DesignToolStage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolStage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
