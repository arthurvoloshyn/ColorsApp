import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "../components/PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/PaletteStyles";

class Palette extends Component {

  state = { level: 500, format: "hex" };

  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (format) => {
    this.setState({ format });
  };

  render() {
    const { classes, palette: { colors, paletteName, emoji, id } } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
