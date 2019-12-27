import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import styles from '../styles/NavbarStyles';

class Navbar extends Component {
  state = { format: 'hex', open: false };

  handleFormatChange = ({ target: { value } }) => {
    const { handleChange } = this.props;

    this.setState({ format: value, open: true });
    handleChange(value);
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      level,
      changeLevel,
      showingAllColors,
      classes: { Navbar, logo, slider, selectContainer }
    } = this.props;
    const { format, open } = this.state;

    return (
      <header className={Navbar}>
        <div className={logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={slider}>
              <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
            </div>
          </div>
        )}
        <div className={selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.shape({
    Navbar: PropTypes.string,
    logo: PropTypes.string,
    slider: PropTypes.string,
    selectContainer: PropTypes.string
  }),
  showingAllColors: PropTypes.bool,
  handleChange: PropTypes.func,
  changeLevel: PropTypes.func,
  level: PropTypes.number
};

Navbar.defaultProps = {
  classes: {
    Navbar: '',
    logo: '',
    slider: '',
    selectContainer: ''
  },
  showingAllColors: false,
  handleChange: () => {},
  changeLevel: () => {},
  level: 0
};

export default withStyles(styles)(Navbar);
