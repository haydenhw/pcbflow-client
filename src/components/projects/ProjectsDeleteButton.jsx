import React from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import FontAwesome from 'react-fontawesome';

export default function ProjectsDeleteButton(props) {
  const { handleClick } = props;

  return (
    <div>
      <FontAwesome
        name="fa-trash-o"
        className="fa-trash-o project-delete-button"
        onClick={handleClick}
      />
    </div>
  );
}

ProjectsDeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

