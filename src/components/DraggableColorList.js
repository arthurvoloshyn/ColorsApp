import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, removeColor }) => (
  <div style={{ height: "100%" }}>
    {colors.map(({ name, color }, i) => (
      <DraggableColorBox
        index={i}
        key={name}
        color={color}
        name={name}
        handleClick={() => removeColor(name)}
      />
    ))}
  </div>
));

export default DraggableColorList;
