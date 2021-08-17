import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebar.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VoiceChatOutlinedIcon from "@material-ui/icons/VoiceChatOutlined";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import SlowMotionVideoOutlinedIcon from "@material-ui/icons/SlowMotionVideoOutlined";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="video-call-1.svg" alt="" />
        <VoiceChatOutlinedIcon />
        <AssistantOutlinedIcon />
        <SlowMotionVideoOutlinedIcon />
      </div>

      <div className="logout__icon">
        <ExitToAppIcon />
      </div>
    </div>
  );
}

export default Sidebar;
