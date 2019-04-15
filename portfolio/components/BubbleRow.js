import React from "react";
import Circle from "./Circle";

const BubbleRow = ({ circleList }) => {
  console.log(circleList);
  return (
    <svg width="1200" viewBox="0 0 1200 200" className="bubbleBar">
      <rect x={0} y={100} width={1200} height={200} />
      {circleList.map((circle, i) => {
        return <Circle x={125 * i + 200} y={50} name={circle} />;
      })}
    </svg>
  );
};

export default BubbleRow;
