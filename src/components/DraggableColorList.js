import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => (
  <div style={{ height: '100%' }}>
    {colors.map(({ name, color }, i) => (
      <DraggableColorBox index={i} key={name} color={color} name={name} handleClick={() => removeColor(name)} />
    ))}
  </div>
));

export default DraggableColorList;
