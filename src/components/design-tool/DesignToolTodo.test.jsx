import React from 'react';
import ReactDOM from 'react-dom';
import DesignToolTodo from './DesignToolTodo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DesignToolTodo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
