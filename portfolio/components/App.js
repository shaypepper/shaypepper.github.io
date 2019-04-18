import React from "react";
import Header from "./Header";
import BubbleRow from "./BubbleRow";
import Circle from "./Circle";
import Shay from "./Shay";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <BubbleRow
        linkList={[
          {
            name: "THESIS",
            url: "https://shaypepper.github.io/econ-project/",
            id: 4
          }
        ]}
      />
      <BubbleRow
        linkList={[
          {
            name: "PROJECT EULER",
            url: "https://github.com/shaypepper/the-unnamed-math-project",
            id: 3
          }
        ]}
      />
      <BubbleRow
        linkList={[
          {
            name: "RESUME",
            url:
              "https://docs.google.com/document/d/e/2PACX-1vT9Tl3R4oN7XtPDu1NcYoz4NrfLWhEJoq8rK77BgtWXY9Jn46fW1f3Hh6qd-8O5B30TmoiRkNWMPIUq/pub",
            id: 4
          },
          { name: "WEDDING", id: 2 }
        ]}
      />
      <BubbleRow
        linkList={[
          {
            name: "CALCU DOKU",
            url:
              "https://github.com/shaypepper/shaypepper.github.io/tree/master/calcudoku/react-redux",
            id: 2
          },

          {
            name: "OILY MANAGER",
            url: "https://www.oilymanager.com/",
            id: 3
          },
          {
            name: "BALLOT MATTERS",
            url: "https://www.youtube.com/watch?v=BNo8DWHsiVs",
            id: 1
          }
        ]}
      />
      <BubbleRow
        linkList={[
          {
            name: "GITHUB",
            url: "https://github.com/shaypepper",
            id: 1
          }
        ]}
      />
      <BubbleRow />
      <BubbleRow />
      <Footer />

      {/* <svg
        width="100%"
        height="100%"
        preserveAspectRatio="true"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        fill="#dec0f9"
        version="1.1"
        id="topSVG"
      >
        <g>
          <rect width="500" height="500" fill="#6e11c1" />
        </g>

        <g class="bubbleRow"

        <g class="bubbleRow">
          <path d="M0 0 V 650 H 650 z" fill="#390964" />
          <Circle
            x={100}
            y={100}
            name="RESUME"
            fillColor={"#b97af2"}
            textColor={"#2C074D"}
            url="https://docs.google.com/document/d/e/2PACX-1vT9Tl3R4oN7XtPDu1NcYoz4NrfLWhEJoq8rK77BgtWXY9Jn46fW1f3Hh6qd-8O5B30TmoiRkNWMPIUq/pub"
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
            name="CALCU DOKU"
            fillColor={"#dec0f9"}
            textColor={"#b97af2"}
            url={"https://github.com/shaypepper/shaypepper.github.io/tree/master/calcudoku/react-redux"}
          />
        </g>

        <g class="bubbleRow">
          <path d="M0 150 v500 h 500 z" fill="#1e0535" />
          <Circle
            x={25}
            y={175}
            name="OILY MANAGER"
            fillColor={"#dec0f9"}
            textColor={"#b97af2"}
            url="https://www.oilymanager.com/"
          />
          <Circle
            x={100}
            y={250}
            name="RUG DOCTOR"
            fillColor={"#dec0f9"}
            textColor={"#b97af2"}
          />

          <Circle
            x={175}
            y={325}
            name="BALLOT MATTERS"
            fillColor={"#dec0f9"}
            textColor={"#b97af2"}
            url="https://www.youtube.com/watch?v=BNo8DWHsiVs"
          />
        </g>
        <Circle
          x={25}
          y={325}
          name="NYT"
          fillColor={"#b97af2"}
          textColor={"#2C074D"}
        />
        <g class="bubbleRow">
          <path d="M0 300 v500 h 500 z" fill="black" />
          <Circle
            x={100}
            y={400}
            name="McKAY"
            fillColor={"#b97af2"}
            textColor={"#2C074D"}
          />
        </g>
        <Header />
      </svg>*/}
      <Shay />
    </div>
  );
};

export default App;
