import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolTourSteps from './DesignToolTourSteps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolTourSteps />, div);
  ReactDOM.unmountComponentAtNode(div);
});
