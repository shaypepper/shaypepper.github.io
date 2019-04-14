import React, { Component } from "react";
import Circle from "./Circle";

const Header = () => {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="true"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      fill="#dec0f9"
      version="1.1"
    >
      <g>
        <rect width="500" height="500" fill="#b97af2" />
      </g>
      <g>
        <path d="M150 0 h -150 L 500 500 v -150 z" fill="#660099" />
        <Circle
          x={210}
          y={60}
          name="THESIS"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />

        <Circle
          x={285}
          y={135}
          name="MATH"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />

        <Circle
          x={360}
          y={210}
          name="CALCU DOKU"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />
      </g>

      <g>
        <path d="M0 0 v 500 h 500 z" fill="#2C074D" />
        <Circle
          x={100}
          y={100}
          name="RESUME"
          fillColor={"#b97af2"}
          textColor={"#2C074D"}
        />
        <Circle
          x={175}
          y={175}
          name="WEDDING"
          fillColor={"#b97af2"}
          textColor={"#2C074D"}
        />

        <Circle
          x={250}
          y={250}
          name="NYT"
          fillColor={"#b97af2"}
          textColor={"#2C074D"}
        />

        <Circle
          x={325}
          y={325}
          name="McKAY"
          fillColor={"#b97af2"}
          textColor={"#2C074D"}
        />
      </g>

      <g>
        <path d="M0 150 v350 h 350 z" fill="black" />
        <Circle
          x={75}
          y={225}
          name="OILY MANAGER"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />
        <Circle
          x={150}
          y={300}
          name="RUG DOCTOR"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />

        <Circle
          x={225}
          y={375}
          name="MATH"
          fillColor={"#dec0f9"}
          textColor={"#b97af2"}
        />
      </g>

      <g class="layer">
        <path d="M0 200 v -200 h 200 z" fill="black" />
        <path d="M0 150 v -150 h 150 z" fill="#9250CC" />
        <path d="M500 350 v 150 h -150 z" fill="white" />
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
      <g>
        <svg
          width="100"
          height="100"
          x="400"
          y="400"
          viewBox="200 0 250 470"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="a">
              <feGaussianBlur in="SourceGraphic" stdDeviation=".1" />
            </filter>
          </defs>
          <g class="layer">
            <g class="layer">
              <path
                d="M200.597 186.618c-.95 4.96-2.098 20.121-2.447 27.282-.349 7.16 6.233 22.3 3.3 33.2-2.933 10.9-2.533 48.633 6.4 65.8 16.933 40.2 38.567 59.6 54.9 93.6 34 54 79.6 16.8 87 9l35-31m-.419 1.36c3.306-32.525 24.3-82.574 30.919-97.574s7.143-17.381-13.143-45c-39.286-29.62-50.905-36.762-96.857-109.857-45.952-73.096-98.905-29.19-96.857-3.286l-7.822 57.321"
                fill="#d4aaff"
                opacity=".25"
              />
              <path
                d="M334.173 235.4c14.443 8.95 54.885 72.9 49.077 89.6l-9 15c-2 26.583-5 1.167-7 2-4.167-1.083-13.833-4.417-15.5 4.25.417 18.25-1.917 34.5-10.75 48.75-6.167 20.667-18.083 39.083-46 37.5 24.25 14.667 62-16.667 66.5-33.5l28-35.75c4.75-18.667 9.75-37.083 18.75-56 33-48.333-40.25-77.917-41.5-86-5.276 7.05-15.051 18.35-32.577 14.15z"
                fill="#aa56ff"
                opacity=".17"
              />
              <path
                d="M199.423 143.286L466.5 139.75l-267.077 3.536z"
                fill="#2d085b"
                opacity=".25"
              />
              <path
                d="M172.847 234.118l29.5-7.5"
                fill="none"
                opacity=".5"
                stroke="#7f00ff"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-width="4"
              />
              <ellipse
                cx="235.818"
                cy="226.794"
                fill="#e5e5e5"
                opacity=".67"
                rx="19.538"
                ry="10.016"
              />
              <ellipse
                cx="236.729"
                cy="215.956"
                opacity=".81"
                rx="7.987"
                ry="5.875"
                stroke="#3b007a"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-width="3"
                transform="matrix(.69935 -1.20666 1.26349 .4873 -210.032 399.357)"
                fill="black"
              />
              <path
                d="M213.315 228.525c11.378-25.342 45.286-6.393 51.384-2.912 6.098 3.482-12.37-23.5-36.066-20.89-23.695 2.612-23.56 19.55-15.318 23.802z"
                fill="#3f007f"
                filter="url(#a)"
              />
              <path
                d="M213.801 228.095c5.733 8.385 15.966 9.27 26.699 7.155"
                fill="none"
                opacity=".35"
                stroke="#2d0000"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
              />
              <ellipse
                cx="341.889"
                cy="222.871"
                fill="#e5e5e5"
                opacity=".61"
                rx="20.151"
                ry="12.931"
                transform="rotate(.332 341.889 222.872)"
              />
              <ellipse
                cx="320.892"
                cy="280.443"
                opacity=".94"
                rx="7.987"
                ry="5.875"
                stroke="#3f007f"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-width="3"
                transform="matrix(.94193 -1.15735 1.23473 .77624 -308.175 372.151)"
                fill="black"
              />
              <path
                d="M324.61 229.13c9.277-26.185 44.615-10.059 50.976-7.085 6.361 2.975-14.241-22.416-37.646-17.885-19.154 5.53-18.641 18.402-13.33 24.97z"
                fill="#3f007f"
              />
              <path
                d="M366.645 222.086c-6.05 9.414-10.256 11.73-23.237 13.86"
                fill="none"
                opacity=".4"
                stroke="#2d0000"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
              />
              <path
                d="M204.051 199.345c6.733-5.365 15.282-9.512 27.949-2.345 13.167 2.417 13.083 2.083 18.25 5.5 17.833 9.75 6.667-7.5 4.75-7-34.083-17-51.3-10.353-50.949 3.845zM334.4 186.536c-4.233 1.41-11.779 5.446-15.481 7.763-18.202 8.317-6.81 11.665 2.581 7.451 9.25-.75 11.75-5.75 24.25-4.5l-11.35-10.714z"
                fill="#5f00bf"
                opacity=".5"
              />
              <path
                d="M262.039 352.36c-6.766 1.618-5.174-11.472-12.7.99-2.663 3.19 2.439 6.444 7.647 3.84 3.11-1.06 1.943-3.77 5.053-4.83z"
                fill="#7f00ff"
                opacity=".25"
              />
              <path
                d="M293.581 326.06c4.106-2.521-9.146 2.814-12.54-1.387 8.605-5.915 30.496-1.937 31.745-1.459 2.666 3.905-15.81 2.096-18.286 12-2.857 11.62-5.429 16.667-12 9.143-2.286-4.952 1.429-9.905 6-14.857l5.081-3.44z"
                fill="#aa56ff"
                opacity=".25"
              />
              <path
                d="M268.76 292.415c-3.825 5.683-11.15 19.867-1.724 27.55 11.425 7.183-20.69 33.142-23.072.856 6.265-18.92 28.62-34.09 24.796-28.406z"
                fill="#c899ff"
                opacity=".13"
              />
              <path
                d="M264.887 352.963c5.165-.13 11.252-.818 15.495-.39 2.094 1.715 10.295 4.53 16.603.46 11.925 2.601 26.172 3.55 39.388-2.112 11.58-8.009 9.143-3.336 4.656 1.653-17.725 29.571-63.493 49.043-76.142.389z"
                fill="red"
                stroke="#bf0000"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
              />
              <path
                d="M288.71 361.51c11.866-.196 24.908-3.483 36.186-2.54-10.2 3.45-22.556 5.11-36.186 2.54z"
                fill="#7f0000"
                opacity=".5"
                stroke="#7f0000"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
              />
              <path
                d="M265.574 353.376c4.089-1.01 7.07 1.662 14.03 7.709 6.961 6.046 1.243 7.7-2.058 5.938-3.3-1.763-6.209-4.501-9.313-6.752l-2.66-6.895h.001z"
                fill="#fff"
                opacity=".25"
              />
              <path
                d="M305.173 268.718c9.86 11.76 21.968 26.521 21.327 41.282 12 2.833 20 24.917 37.5 22.75-15.109-23.344-40.218-49.938-58.827-64.032z"
                fill="#c899ff"
                opacity=".15"
              />
              <path
                d="M265.256 105.077c32.748 25.807 32.246 92.615 56.244 111.173l33.25-12.75-68.5-100.75"
                fill="#aa56ff"
                opacity=".25"
              />
              <path
                d="M341.907 347.27c6.54-2.37-1.112-9.622 11.29-5.706 3.803.638 1.023 5.173-4.665 6.16-3.157.896-3.468-1.35-6.625-.455v.001z"
                fill="#7f00ff"
                opacity=".25"
              />
              <path
                d="M330.889 191.868c-16.333-25.373-21.247-52.745-48.998-76.118-24.492-12.333-62.886-29.167-74.966 21.5-2.98 17.5-3.972 42-6.95 59.5-7.117-37.667-3.807-64.333 9.928-117.5 47.992-91 209.84-71.833 245.255 40.5 25.485 70.333 24.172 118.667 37.848 172.25 13.676 53.583-30.518 141.167 23.599 191.5l-112.214.25c-5.461-31.167-23.717-21.333-23.703-53.5-1.986-16.167 4.633-71.833 21.348-108.5 3.31-15.833 17.045-34.167 12.411-47.5-14.944-34.96-55.705-54.921-83.558-82.382z"
                fill="#3f007f"
              />
              <path
                d="M297.719 100.445L355 148.75l-27.75-40 60.5 56.5-20.5-32.75c24.917 17.833 50.583 48.417 56 80.5-12.583 5.25-14.667-4.625-20.875-11.531-4.458-5.156-15.042-15.344-21.625-20.719 7.5 2 32.719 50.445 40.719 67.695 0-.25-123.75-148-123.75-148z"
                fill="#fff"
                opacity=".25"
              />
              <path
                d="M266.357 230.094c-15.342-9.322-60.181-23.167-91.04-11.502-4.744 27.477 7.634 57.842 12.656 62.826 16.165 1.845 91.327 7.235 78.037-50.442 10.17-2.992 22.336-3.483 33.5.025 28.02-26.979 82.524-32.932 113.51-13.41-4.953 20.163-4.655 43.326-14.858 60.488-5.023 2.326-85.615 21.341-98.152-46.577"
                fill="none"
                stroke="#000"
                stroke-dasharray="null"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-width="8"
              />
            </g>
          </g>
        </svg>
      </g>
    </svg>
  );
};

export default Header;
