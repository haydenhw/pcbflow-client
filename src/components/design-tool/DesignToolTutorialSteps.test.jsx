import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolTutorialSteps from './DesignToolTutorialSteps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolTutorialSteps />, div);
  ReactDOM.unmountComponentAtNode(div);
});
