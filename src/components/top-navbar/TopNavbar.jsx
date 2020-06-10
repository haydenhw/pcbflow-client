import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import PopupMenu from 'components/popup-menu/PopupMenu';
import PopupMenuTrigger from 'components/popup-menu/PopupMenuTrigger';
import PopupMenuContent from 'components/popup-menu/PopupMenuContent';
import TopNavbarEditableText from './TopNavbarEditableText';
import TopNavbarSaveButton from './TopNavbarSaveButton';
import TopNavbarButton from './TopNavbarButton';

import './top-navbar-styles/_TopNavbar.scss';

const getSaveStatusMessage = (isSaving) => {
  switch (isSaving) {
    case null:
      return '';
    case true:
      return '...Saving'
    case false:
      return 'All changes saved'
    default:
      return '';
  }
}

export default function TopNavbar(props) {
  const {
    handleExportButtonClick,
    handleHomeButtonClick,
    handleProjectsButtonClick,
    handleMenuClick,
    handleNameChange,
    isNavMenuActive,
    isSaving,
    projectName,
    recordSavedChanges,
    routeToProjects,
    updateLastSaved,
    updateThumbnail,
  } = props;

  return (
    <div className="nav" style={{ width: "100%"}}>
      <div className="iconWrapper" onClick={handleProjectsButtonClick}>
        <FontAwesome
          className="fa-folder-open"
          name="fa-folder-open"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>
      <TopNavbarEditableText
        text={projectName}
        handleNameChange={handleNameChange}
      />

      <div className="nav-button-group">
        <span className="nav-save-status">{getSaveStatusMessage(isSaving)}</span>
        <TopNavbarButton
          className="nav-button tutorial-button"
          handleClick={() => store.dispatch(actions.startTutorial())}
          icon={<span className="tutorial-button-icon icon-school"></span>}
          text="Tutorial"
        />
        <TopNavbarButton
          className="nav-button export-button"
          handleClick={handleExportButtonClick}
          icon={<FontAwesome name="fa-file-pdf-o" className="fa-file-pdf-o" />}
          text="Export"
        />
        <TopNavbarButton
          className="nav-button home-button"
          handleClick={handleHomeButtonClick}
          icon={<span className="icon-home" />}
          text=""
        />
        <PopupMenu>
          <PopupMenuTrigger handleClick={handleMenuClick}>
            <TopNavbarButton
              className="nav-button menu-button"
              icon={<span className="icon-menu1" />}
              text=""
            />
          </PopupMenuTrigger>
          <PopupMenuContent isActive={isNavMenuActive}>
            <li onClick={handleHomeButtonClick} className="popup-menu-item">
              <span className="popup-menu-item-icon icon-home" />
              <span className="popup-menu-item-text">Home</span>
            </li>
            <li onClick={handleExportButtonClick} className="popup-menu-item">
              <FontAwesome name="fa-file-pdf-o" className="popup-menu-item-icon fa-file-pdf-o" />
              <span className="popup-menu-item-text">Export PDF</span>
            </li>
          </PopupMenuContent>
        </PopupMenu>
      </div>
    </div>
  );
}

TopNavbar.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  recordSavedChanges: PropTypes.func.isRequired,
  updateLastSaved: PropTypes.func.isRequired,
  updateThumbnail: PropTypes.func.isRequired,
};
