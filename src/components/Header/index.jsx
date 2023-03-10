import React from 'react';
import './header.css';
import PropTypes from 'prop-types';

function Header({ heading }) {
  return (
    <div id="header">
      <p id="headertext">{heading}</p>
    </div>
  );
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Header;
