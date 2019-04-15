import React from "react";

const Circle = ({ name, x, y, size = 100, textColor, fillColor = "grey", url}) => {
  const namePieces = name.split(" ");
  const id = namePieces[0];
  const cutoffId = `${id}-cut-off`;
  console.log(namePieces);

  return (
    <a href={url}
	  target="_blank">
    <svg height={size} width={size} x={x} y={y} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="gradient">
          <stop offset="0" stopColor="white" stopOpacity="0.25" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>

        <mask id={cutoffId}>
          <rect x="0" y="0" height="50" width="100" fill="url(#gradient)" />
        </mask>
      </defs>
      <circle
        r="50"
        cx="50"
        cy="50"
        fill="white" //b97af2
        origin="50% 50%"
        mask={`url(#${cutoffId})`}
        className="previewCircle"
      />
      <g class="circleComponent">
        <circle
          r="50"
          cx="50"
          cy="50"
          fill="#BF30AA"
          origin="50% 50%"
          mask={`url(#${cutoffId})`}
        />

        {namePieces.map((word, i) => (
          <text
            fontFamily="Raleway"
            fontSize="18"
            letterSpacing="-1"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            strokeWidth="0"
            textAnchor="middle"
            class="circleText"
            x="50"
            y={50 - (namePieces.length - i - 1) * 16}
            width="70"
            fill="#2C074D"
          >
            {word}
          </text>
        ))}
      </g>
    </svg>
    </a>
  );
};

export default Circle;
