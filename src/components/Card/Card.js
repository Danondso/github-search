import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export function Card({ children }) {
  return (
    <div className="card-container">
      {children}
    </div>
  );
}

export function CardHeader({ headerText, headerStyle }) {
  return (<div className="card-header" style={headerStyle}>{headerText}</div>
  );
}

export function CardContent({ children, contentStyle }) {
  return (
    <div className="card-content" style={contentStyle}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

CardHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  // I prefer not to disable per line unless it's really required,
  // ideally I have a custom type for this but I'm foregoing that.
  // eslint-disable-next-line react/forbid-prop-types
  headerStyle: PropTypes.object,
};

CardHeader.defaultProps = {
  headerStyle: {
    backgroundColor: '#fff',
    color: '#000',
  },
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  // I prefer not to disable per line unless it's really required,
  // ideally I have a custom type for this but I'm foregoing that.
  // eslint-disable-next-line react/forbid-prop-types
  contentStyle: PropTypes.object,
};

CardContent.defaultProps = {
  contentStyle: {
    backgroundColor: '#fff',
  },
};
