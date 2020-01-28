import React from 'react';
import PropTypes from 'prop-types';

import '../styles/page/Page.css';

const Page = ({ children }) => <div className="page">{children}</div>;

Page.propTypes = {
  children: PropTypes.element
};

Page.defaultProps = {
  children: null
};

export default Page;
