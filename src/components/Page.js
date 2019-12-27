import React from 'react';
import PropTypes from 'prop-types';

import '../styles/page/Page.css';

const Page = ({ children }) => <section className="page">{children}</section>;

Page.propTypes = {
  children: PropTypes.element
};

Page.defaultProps = {
  children: null
};

export default Page;
