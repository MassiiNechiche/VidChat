import React from "react";
import "./outbound.css";
import { Dot } from "react-animated-dots";

function Outbound() {
  return (
    <div className="outbound">
      <div className="outbound__content">
        <h2>
          Calling
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </h2>
      </div>
    </div>
  );
}

export default Outbound;
