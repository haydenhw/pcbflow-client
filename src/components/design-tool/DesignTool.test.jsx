import React from 'react';
import ReactDOM from 'react-dom';
import DesignTool from './DesignTool';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignTool />, div);
  ReactDOM.unmountComponentAtNode(div);
});
