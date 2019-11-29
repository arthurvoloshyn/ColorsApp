import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/PaletteFooterStyles";

const PaletteFooter = ({ paletteName, emoji, classes }) => (
  <footer className={classes.PaletteFooter}>
    {paletteName}
    <span className={classes.emoji}>{emoji}</span>
  </footer>
);

export default withStyles(styles)(PaletteFooter);
