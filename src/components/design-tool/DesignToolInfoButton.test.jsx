import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolInfoButton from './DesignToolInfoButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolInfoButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
