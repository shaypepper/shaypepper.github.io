import React, { Component } from "react";
import Circle from "./Circle";
import Shay from "./Shay";

const Footer = () => {
  return (
    <div class="header">
      <svg class="namePlate" width="200px" viewBox="-10 -30 200 220">
        <g class="layer">
          <text
            fontFamily="Raleway"
            fontSize="24"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            strokeWidth="0"
            textAnchor="middle"
            x="87"
            y="92"
            fill="#9250CC"
          >
            CULPEPPER
          </text>
          <text
            fontFamily="Italianno"
            fontSize="140"
            strokeDasharray="null"
            strokeLinecap="null"
            strokeLinejoin="null"
            strokeWidth="0"
            textAnchor="middle"
            x="100"
            y="72"
            fill="white"
          >
            shay
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Footer;
