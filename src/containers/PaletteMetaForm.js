import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  state = {
    stage: 'form',
    newPaletteName: ''
  };

  componentDidMount() {
    const { palettes } = this.props;

    ValidatorForm.addValidationRule('isPaletteNameUnique', value => palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' });
  };

  savePalette = ({ native }) => {
    const { newPaletteName } = this.state;
    const { handleSubmit } = this.props;
    const newPalette = {
      paletteName: newPaletteName,
      emoji: native
    };

    handleSubmit(newPalette);
    this.setState({ stage: '' });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;

    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
        </Dialog>
        <Dialog open={stage === 'form'} aria-labelledby="form-dialog-title" onClose={hideForm}>
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>{"Please enter a name for your new beautiful palette. Make sure it's unique!"}</DialogContentText>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

PaletteMetaForm.propTypes = {
  palettes: PropTypes.array,
  handleSubmit: PropTypes.func,
  hideForm: PropTypes.func
};

PaletteMetaForm.defaultProps = {
  palettes: [],
  handleSubmit: () => {},
  hideForm: () => {}
};

export default PaletteMetaForm;
