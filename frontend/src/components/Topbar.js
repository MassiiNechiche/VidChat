import { Avatar } from "@material-ui/core";
import React from "react";
import "./topbar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Topbar({ stream }) {
  return (
    <div className="topbar">
      <div className="user__area">
        <Avatar src="https://uifaces.co/our-content/donated/1H_7AxP0.jpg" />{" "}
        {stream && <FiberManualRecordIcon />}
        <span>John Doe</span>
      </div>
    </div>
  );
}

export default Topbar;
