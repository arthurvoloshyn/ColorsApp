import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';

import PaletteMetaForm from './PaletteMetaForm';

import styles from '../styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  state = { newPaletteName: '', formShowing: false };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const {
      classes: { root, appBar, appBarShift, menuButton, hide, navBtns, button },
      open,
      palettes,
      handleSubmit,
      handleDrawerOpen
    } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(appBar, {
            [appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(menuButton, {
                [hide]: open
              })}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={navBtns}>
            <Link to="/">
              <Button variant="contained" color="secondary" className={button}>
                Go Back
              </Button>
            </Link>
            <Button variant="contained" color="primary" onClick={this.showForm} className={button}>
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />}
      </div>
    );
  }
}

PaletteFormNav.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    appBar: PropTypes.string,
    appBarShift: PropTypes.string,
    menuButton: PropTypes.string,
    hide: PropTypes.string,
    navBtns: PropTypes.string,
    button: PropTypes.string
  }),
  open: PropTypes.bool,
  palettes: PropTypes.array,
  handleSubmit: PropTypes.func,
  handleDrawerOpen: PropTypes.func
};

PaletteFormNav.defaultProps = {
  classes: {
    root: '',
    appBar: '',
    appBarShift: '',
    menuButton: '',
    hide: '',
    navBtns: '',
    button: ''
  },
  open: false,
  palettes: [],
  handleSubmit: () => {},
  handleDrawerOpen: () => {}
};

const withTheme = { withTheme: true };

export default withStyles(styles, withTheme)(PaletteFormNav);
