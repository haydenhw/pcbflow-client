import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolDocumentationCardKey from './DesignToolDocumentationCardKey';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolDocumentationCardKey />, div);
  ReactDOM.unmountComponentAtNode(div);
});
