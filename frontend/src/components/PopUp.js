import { Button } from "@material-ui/core";
import React from "react";
import "./popUp.css";
import CallIcon from "@material-ui/icons/Call";
import Input from "@material-ui/core/Input";

function PopUp({ closePop, idToCall, setIdToCall, callUser, me }) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={closePop}>
          x
        </span>

        <div className="pop__content">
          <Input
            required={true}
            type="text"
            placeholder="Paste ID"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CallIcon fontSize="large" />}
            onClick={() => {
              if (idToCall.length > 0) {
                if (idToCall === me) {
                  alert("Open an incognito tab to call yourself");
                } else {
                  callUser(idToCall);
                }
              }
            }}
          >
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
