import { Button } from "@material-ui/core";
import React from "react";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="login__content">
        <img src="video-call.svg" alt="" />
        <Button color="primary" variant="contained">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
