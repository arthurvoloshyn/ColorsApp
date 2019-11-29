import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "../styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {

  state = { currentColor: "teal", newColorName: "" };

  componentDidMount() {
    const { colors } = this.props;

    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color }) => color !== this.state.currentColor)
    );
  };

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { currentColor, newColorName } = this.state;
    const newColor = {
      color: currentColor,
      name: newColorName
    };

    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          ref='form'
          instantValidate={false}
        >
          <TextValidator
            value={newColorName}
            className={classes.colorNameInput}
            placeholder='Color Name'
            name='newColorName'
            variant='filled'
            margin='normal'
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used!"
            ]}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{
              backgroundColor: paletteIsFull ? "grey" : currentColor
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(styles)(ColorPickerForm);
