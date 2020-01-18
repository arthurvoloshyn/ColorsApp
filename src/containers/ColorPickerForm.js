import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  state = { currentColor: 'teal', newColorName: '' };

  form = createRef();

  componentDidMount() {
    const { colors } = this.props;
    const { currentColor } = this.state;

    ValidatorForm.addValidationRule('isColorNameUnique', value => colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()));

    ValidatorForm.addValidationRule('isColorUnique', value => colors.every(({ color }) => color !== currentColor));

    ValidatorForm.addValidationRule('MaxLength', value => value.length < 10);
  }

  updateCurrentColor = ({ hex }) => {
    this.setState({ currentColor: hex });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { currentColor, newColorName } = this.state;
    const { addNewColor } = this.props;
    const newColor = {
      color: currentColor,
      name: newColorName
    };

    addNewColor(newColor);
    this.setState({ newColorName: '' });
  };

  render() {
    const {
      paletteIsFull,
      classes: { picker, colorNameInput, addColor }
    } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} className={picker} />
        <ValidatorForm onSubmit={this.handleSubmit} ref={this.form} instantValidate={false}>
          <TextValidator
            value={newColorName}
            className={colorNameInput}
            placeholder="Color Name"
            name="newColorName"
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique', 'MaxLength']}
            errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!', 'The maximum length of a color name is 9']}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={addColor}
            style={{
              backgroundColor: paletteIsFull ? 'grey' : currentColor
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

ColorPickerForm.propTypes = {
  classes: PropTypes.shape({
    picker: PropTypes.string,
    colorNameInput: PropTypes.string,
    addColor: PropTypes.string
  }),
  paletteIsFull: PropTypes.bool,
  addNewColor: PropTypes.func,
  colors: PropTypes.array
};

ColorPickerForm.defaultProps = {
  classes: {
    picker: '',
    colorNameInput: '',
    addColor: ''
  },
  paletteIsFull: false,
  addNewColor: () => {},
  colors: []
};

export default withStyles(styles)(ColorPickerForm);
