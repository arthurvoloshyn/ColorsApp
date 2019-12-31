import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import PaletteFooter from '../components/PaletteFooter';

import ColorBox from './ColorBox';
import Navbar from './Navbar';

import styles from '../styles/PaletteStyles';

class Palette extends Component {
  state = { level: 500, format: 'hex' };

  changeLevel = level => {
    this.setState({ level });
  };

  changeFormat = format => {
    this.setState({ format });
  };

  render() {
    const {
      classes: { Palette: classesPalette, colors: classesColors },
      palette: { colors, paletteName, emoji, id }
    } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => {
      const { name: colorName, id: colorId } = color;
      return <ColorBox background={color[format]} name={colorName} key={colorId} moreUrl={`/palette/${id}/${colorId}`} showingFullPalette />;
    });

    return (
      <div className={classesPalette}>
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
        <div className={classesColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

Palette.propTypes = {
  classes: PropTypes.shape({
    Palette: PropTypes.string,
    colors: PropTypes.string
  }),
  palette: PropTypes.shape({
    colors: PropTypes.object.isRequired,
    paletteName: PropTypes.string,
    emoji: PropTypes.string,
    id: PropTypes.string
  })
};

Palette.defaultProps = {
  classes: {
    Palette: '',
    colors: ''
  },
  palette: {
    paletteName: '',
    emoji: '',
    id: ''
  }
};

export default withStyles(styles)(Palette);
