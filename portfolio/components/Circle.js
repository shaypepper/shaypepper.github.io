import React from "react";

const Circle = ({ name, x, y, size = 100, textColor, fillColor }) => {
  const namePieces = name.split(" ");
  const id = namePieces[0];
  const cutoffId = `${id}-cut-off`;
  console.log(namePieces);

  return (
    <svg height={size} width={size} x={x} y={y} viewBox="0 0 100 100">
      <defs>
        <mask id={cutoffId}>
          <path d="M0 0 h 100 v 100 z" fill="white" />
        </mask>
      </defs>
      <g class="circleComponent">
        <circle
          r="50"
          cx="50"
          cy="50"
          fill={fillColor}
          origin="50% 50%"
          mask={`url(#${cutoffId})`}
        />

        {namePieces.map((word, i) => (
          <text
            fontFamily="Raleway"
            fontSize="18"
            letter-spacing="-1"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            strokeWidth="0"
            textAnchor="middle"
            transform="rotate(45 50 50)"
            x="50"
            y={50 - (namePieces.length - i - 1) * 20}
            width="70"
            fill={textColor}
          >
            {word}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default Circle;
