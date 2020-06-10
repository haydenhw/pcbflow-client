import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolDocumentationCard from './DesignToolDocumentationCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolDocumentationCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
