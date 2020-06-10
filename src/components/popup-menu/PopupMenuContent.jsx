import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function PopupMenuContent(props) {
  const { children } = props;

  const renderContent = () => {
    const { isActive } = props;

    if (isActive) {
      return (
        <ul className="popup-menu-content">
          {children}
        </ul>
      );
    }

    return null;
  };

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="popup-menu"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {renderContent()}
      </ReactCSSTransitionGroup>
    </div>
  );
}

PopupMenuContent.propTypes = {
  children: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
};
