import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withStyles } from '@material-ui/styles';

import styles from '../styles/ColorBoxStyles';

class ColorBox extends Component {
  state = { copied: false };

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  stopPropagation = e => {
    e.stopPropagation();
  };

  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes: { ColorBox, copyOverlay, copyMessage, copyText, boxContent, colorName, copyButton, seeMore, showOverlay, showMessage }
    } = this.props;

    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={ColorBox}>
          <div
            style={{ background }}
            className={classNames(copyOverlay, {
              [showOverlay]: copied
            })}
          />

          <div
            className={classNames(copyMessage, {
              [showMessage]: copied
            })}
          >
            <h1>copied!</h1>
            <p className={copyText}>{background}</p>
          </div>
          <div>
            <div className={boxContent}>
              <span className={colorName}>{name}</span>
            </div>
            <button className={copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={this.stopPropagation}>
              <span className={seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

ColorBox.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    ColorBox: PropTypes.string,
    copyOverlay: PropTypes.string,
    copyMessage: PropTypes.string,
    copyText: PropTypes.string,
    boxContent: PropTypes.string,
    colorName: PropTypes.string,
    copyButton: PropTypes.string,
    seeMore: PropTypes.string,
    showOverlay: PropTypes.string,
    showMessage: PropTypes.string,
    deleteIcon: PropTypes.string
  }),
  showingFullPalette: PropTypes.bool,
  background: PropTypes.string,
  name: PropTypes.string,
  moreUrl: PropTypes.string
};

ColorBox.defaultProps = {
  classes: {
    root: '',
    ColorBox: '',
    copyOverlay: '',
    copyMessage: '',
    copyText: '',
    boxContent: '',
    colorName: '',
    copyButton: '',
    seeMore: '',
    showOverlay: '',
    showMessage: '',
    deleteIcon: ''
  },
  showingFullPalette: false,
  background: '',
  name: '',
  moreUrl: '/'
};

export default withStyles(styles)(ColorBox);
