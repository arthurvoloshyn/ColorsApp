import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../styles/MiniPaletteStyles';

const MiniPalette = ({
  openDialog,
  id,
  goToPalette,
  classes: { colors: classesColors, miniColor: classesMiniColor, root: classesRoot, deleteIcon: classesDeleteIcon, title: classesTitle, emoji: classesEmoji },
  paletteName,
  emoji,
  colors
}) => {
  const deletePalette = e => {
    e.stopPropagation();

    openDialog(id);
  };

  const handleClick = () => {
    goToPalette(id);
  };

  const miniColorBoxes = colors.map(({ color, name }) => <div className={classesMiniColor} style={{ backgroundColor: color }} key={name} />);

  return (
    <div className={classesRoot} onClick={handleClick}>
      <DeleteIcon className={classesDeleteIcon} style={{ transition: 'all 0.3s ease-in-out' }} onClick={deletePalette} />

      <div className={classesColors}>{miniColorBoxes}</div>
      <h5 className={classesTitle}>
        {paletteName} <span className={classesEmoji}>{emoji}</span>
      </h5>
    </div>
  );
};

MiniPalette.propTypes = {
  classes: PropTypes.shape({
    colors: PropTypes.string,
    root: PropTypes.string,
    miniColor: PropTypes.string,
    deleteIcon: PropTypes.string,
    title: PropTypes.string,
    emoji: PropTypes.string
  }),
  openDialog: PropTypes.func,
  goToPalette: PropTypes.func,
  colors: PropTypes.array,
  paletteName: PropTypes.string,
  emoji: PropTypes.string,
  id: PropTypes.string
};

MiniPalette.defaultProps = {
  classes: {
    colors: '',
    root: '',
    miniColor: '',
    deleteIcon: '',
    title: '',
    emoji: ''
  },
  openDialog: () => {},
  goToPalette: () => {},
  colors: [],
  paletteName: '',
  emoji: '',
  id: ''
};

export default withStyles(styles)(MiniPalette);
