import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(({ classes: { root, boxContent, deleteIcon }, handleClick, name, color }) => (
  <div className={root} style={{ backgroundColor: color }}>
    <div className={boxContent}>
      <span> {name}</span>
      <DeleteIcon className={deleteIcon} onClick={handleClick} />
    </div>
  </div>
));

export default withStyles(styles)(DraggableColorBox);
