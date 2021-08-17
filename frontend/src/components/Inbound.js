import React from "react";
import "./inbound.css";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import Sound from "react-sound";
import tone from "./tone.mp3";
import { Dot } from "react-animated-dots";

function Inbound({ answerCall, name }) {
  return (
    <div className="inbound">
      <div className="i__box">
        <div className="inbound__content">
          <div className="caller">
            <Avatar src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
            <span>
              {name} is calling
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </span>
            <Sound
              url={tone}
              playStatus={Sound.status.PLAYING}
              playFromPosition={300}
            />
          </div>
          <div className="action">
            <div>
              <CallIcon onClick={answerCall} />
            </div>
            <div>
              <CallEndIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbound;
