import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {

  deletePalette = (e) => {
    e.stopPropagation();

    const { openDialog, id } = this.props;

    openDialog(id);
  };

  handleClick = () => {
    const { goToPalette, id } = this.props;

    goToPalette(id);
  };

  render() {
    const { classes, paletteName, emoji, colors } = this.props;

    const miniColorBoxes = colors.map(({ color, name }) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color }}
        key={name}
      />
    ));

    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
