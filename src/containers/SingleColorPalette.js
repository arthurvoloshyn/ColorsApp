import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import PaletteFooter from '../components/PaletteFooter';

import Navbar from './Navbar';
import ColorBox from './ColorBox';

import styles from '../styles/PaletteStyles';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    const { palette, colorId } = this.props;

    this._shades = this.gatherShades(palette, colorId);
    this.state = { format: 'hex' };
  }

  gatherShades = ({ colors }, colorToFilterBy) => {
    const allColors = colors;
    let shades = [];

    for (const key in allColors) {
      const color = allColors[key].filter(({ id }) => id === colorToFilterBy);

      shades = shades.concat(color);
    }
    return shades.slice(1);
  };

  changeFormat = format => {
    this.setState({ format });
  };

  render() {
    const { format } = this.state;
    const {
      classes: { Palette, colors, goBack },
      palette: { paletteName, emoji, id }
    } = this.props;

    const colorBoxes = this._shades.map(color => {
      const { name } = color;

      return <ColorBox key={name} name={name} background={color[format]} showingFullPalette={false} />;
    });

    return (
      <div className={Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={colors}>
          {colorBoxes}
          <div className={goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

SingleColorPalette.propTypes = {
  classes: PropTypes.shape({
    Palette: PropTypes.string,
    colors: PropTypes.string,
    goBack: PropTypes.string
  }),
  palette: PropTypes.shape({
    paletteName: PropTypes.string,
    emoji: PropTypes.string,
    id: PropTypes.string,
    colors: PropTypes.object
  }),
  colorId: PropTypes.string
};

SingleColorPalette.defaultProps = {
  classes: {
    Palette: '',
    colors: '',
    goBack: ''
  },
  palette: {
    paletteName: '',
    emoji: '',
    id: '',
    colors: {}
  },
  colorId: ''
};

export default withStyles(styles)(SingleColorPalette);
