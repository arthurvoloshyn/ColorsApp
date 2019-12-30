import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import arrayMove from 'array-move';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import DraggableColorList from '../components/DraggableColorList';

import seedColors from '../utils/seedColors';
import { randomColors } from '../utils/randomColors';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

import styles from '../styles/NewPaletteFormStyles';

const firstSeedColors = seedColors[0].colors;

class NewPaletteForm extends Component {
  state = {
    open: true,
    colors: firstSeedColors
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = newColor => {
    const { colors } = this.state;
    this.setState({
      colors: [...colors, newColor],
      newColorName: ''
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };

  addRandomColor = () => {
    const { colors } = this.state;
    const { palettes } = this.props;

    const randomColor = randomColors(palettes, colors);

    this.setState({ colors: [...colors, randomColor] });
  };

  handleSubmit = newPalette => {
    const {
      savePalette,
      history: { push }
    } = this.props;
    const { colors } = this.state;
    const { paletteName } = newPalette;

    newPalette.id = paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
    savePalette(newPalette);
    push('/');
  };

  removeColor = colorName => {
    const { colors } = this.state;

    this.setState({
      colors: colors.filter(({ name }) => name !== colorName)
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  render() {
    const {
      classes: { root, drawer, drawerPaper, drawerHeader, container, buttons, button, content, contentShift },
      maxColors,
      palettes
    } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={root}>
        <PaletteFormNav open={open} palettes={palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen} />
        <Drawer
          className={drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: drawerPaper
          }}
        >
          <div className={drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={buttons}>
              <Button variant="contained" color="secondary" onClick={this.clearColors} className={button}>
                Clear Palette
              </Button>
              <Button variant="contained" className={button} color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>
                Random Color
              </Button>
            </div>
            <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors} />
          </div>
        </Drawer>
        <main
          className={classNames(content, {
            [contentShift]: open
          })}
        >
          <div className={drawerHeader} />
          <DraggableColorList colors={colors} removeColor={this.removeColor} axis="xy" onSortEnd={this.onSortEnd} distance={20} />
        </main>
      </div>
    );
  }
}

NewPaletteForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    drawer: PropTypes.string,
    drawerPaper: PropTypes.string,
    slider: PropTypes.string,
    drawerHeader: PropTypes.string,
    container: PropTypes.string,
    buttons: PropTypes.string,
    button: PropTypes.string,
    content: PropTypes.string,
    contentShift: PropTypes.string
  }),
  maxColors: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  savePalette: PropTypes.func,
  palettes: PropTypes.array
};

NewPaletteForm.defaultProps = {
  classes: {
    root: '',
    drawer: '',
    drawerPaper: '',
    drawerHeader: '',
    container: '',
    buttons: '',
    logo: '',
    button: '',
    content: '',
    contentShift: ''
  },
  maxColors: 20,
  history: {
    push: () => {}
  },
  savePalette: () => {},
  palettes: []
};

const withTheme = { withTheme: true };

export default withStyles(styles, withTheme)(NewPaletteForm);
