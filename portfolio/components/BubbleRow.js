import React from "react";
import Circle from "./Circle";

const BubbleRow = ({ linkList = [] }) => {
  const circleList = new Array(10).fill({});
  linkList.forEach(link => {
    circleList[link.id] = link;
  });

  return (
    <div class="bubbleRow">
      {circleList.map(circle => (
        <Circle name={circle.name} url={circle.url} key={circle.name} />
      ))}
    </div>
  );
};

export default BubbleRow;
