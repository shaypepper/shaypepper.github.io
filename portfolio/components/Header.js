import React, { Component } from "react";
import Circle from "./Circle";
import Shay from "./Shay";

const Header = () => {
  return (
    <svg  class="header">
      <g class="layer">
        <path d="M0 200 v -200 h 200 z" fill="black" />
        <path d="M0 150 v -150 h 150 z" fill="#9250CC" />
        {/* <path d="M500 350 v 150 h -150 z" fill="white" /> */}
        <text
          fontFamily="Italianno"
          fontSize="110"
          strokeDasharray="null"
          strokeLinecap="null"
          strokeLinejoin="null"
          strokeWidth="0"
          textAnchor="middle"
          transform="rotate(-45, 85, 85)"
          x="80"
          y="70"
          fill="white"
        >
          shay
        </text>
        <text
          fontFamily="Raleway"
          fontSize="24"
          strokeDasharray="null"
          strokeLinecap="null"
          strokeLinejoin="null"
          strokeWidth="0"
          textAnchor="middle"
          transform="rotate(-45 87 87)"
          x="87"
          y="87"
          fill="#9250CC"
        >
          CULPEPPER
        </text>
      </g>
    </svg>
  );
};

export default Header;
