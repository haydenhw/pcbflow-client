import React from 'react';
import PropTypes from 'prop-types';

export default function LandingPageCard(props) {
  const { content, iconClassName, infoType, title } = props;
  return (
    <div className="info-card">
      <div>
        <span className={`${infoType} ${iconClassName}`} />
      </div>
      <h1 className={`info-card-title ${infoType}`}>{title}</h1>
      <p className="info-card-text">{content}</p>
    </div>
  );
}

LandingPageCard.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  infoType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
