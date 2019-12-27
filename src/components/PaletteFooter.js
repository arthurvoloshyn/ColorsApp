import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import styles from '../styles/PaletteFooterStyles';

const PaletteFooter = ({ paletteName, emoji, classes: { PaletteFooter: classesPaletteFooter, emoji: classesEmoji } }) => (
  <footer className={classesPaletteFooter}>
    {paletteName}
    <span className={classesEmoji}>{emoji}</span>
  </footer>
);

PaletteFooter.propTypes = {
  paletteName: PropTypes.string,
  emoji: PropTypes.string,
  classes: PropTypes.shape({
    PaletteFooter: PropTypes.string,
    emoji: PropTypes.string
  })
};

PaletteFooter.defaultProps = {
  paletteName: '',
  emoji: '',
  classes: {
    PaletteFooter: '',
    emoji: ''
  }
};

export default withStyles(styles)(PaletteFooter);
