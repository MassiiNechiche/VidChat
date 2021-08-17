import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./getId.css";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Button } from "@material-ui/core";

function GetId({ closePop, text }) {
  return (
    <div className="popup-box">
      <div className="id_box">
        <span className="close-icon" onClick={closePop}>
          x
        </span>

        <div className="pop__cont">
          <div className="myId">{text}</div>
          <CopyToClipboard text={text} style={{ marginBottom: "2rem" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default GetId;
