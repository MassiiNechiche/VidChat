import "./landing.css";

import PopUp from "./PopUp";
import GetId from "./GetId";
import Inbound from "./Inbound";

import CallEndIcon from "@material-ui/icons/CallEnd";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import VolumeDownOutlinedIcon from "@material-ui/icons/VolumeDownOutlined";
import TimerOutlinedIcon from "@material-ui/icons/TimerOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Outbound from "./Outbound";

const socket = io.connect("http://localhost:5000");

function Landing({ setStreamOn }) {
  const [popUp, setPopup] = useState(false);
  const [myId, setMyId] = useState(false);
  const [connected, setConnected] = useState(false);
  const [calling, setCalling] = useState(false);

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("John Doe");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  socket.on("me", (id) => {
    setMe(id);
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [callAccepted, name, receivingCall, callAccepted, callEnded]);

  const callUser = (id) => {
    closePop();
    setConnected(true);

    setCalling(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    setConnected(true);
    setCalling(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setConnected(false);
    setCalling(false);
    connectionRef.current.destroy();
  };

  const closePop = () => {
    setPopup(false);
    setMyId(false);
  };

  return (
    <div className="container">
      {popUp ? (
        <PopUp
          closePop={closePop}
          idToCall={idToCall}
          setIdToCall={setIdToCall}
          callUser={callUser}
          me={me}
        />
      ) : null}

      {myId ? <GetId closePop={closePop} text={me} /> : null}

      {receivingCall && !callAccepted ? (
        <Inbound answerCall={answerCall} name={name} />
      ) : null}

      {!connected ? (
        <div className="landing">
          <h2>Hi, {name} 👋</h2>

          <h1>What do you want to do today ?</h1>
          <div className="landing__buttons">
            <a>
              <span className="new" onClick={() => setPopup(true)}>
                New meeting <VideocamIcon />
              </span>
            </a>
            <a>
              <span className="join" onClick={() => setMyId(true)}>
                Join a meeting <AssistantOutlinedIcon />
              </span>
            </a>
          </div>
          <div className="landing__contacts">
            <h3>
              Your contacts <a href="">see all</a>
            </h3>
            <div className="contacts__images">
              <img
                src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=ddcb7ec744fc63472f2d9e19362aa387"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=73a9df4b7bd1b330db1e903e08575ec1"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1438275/pexels-photo-1438275.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                alt=""
              />
            </div>
          </div>
          {stream && (
            <div>
              {setStreamOn(true)}
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ display: "none", width: "200px" }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="callCenter">
          <div className="caller__panel">
            {calling && !callAccepted ? <Outbound /> : null}
            {callAccepted && !callEnded ? (
              <>
                <div className="timer">
                  <TimerOutlinedIcon />
                </div>

                <div className="callerVideo">
                  <video playsInline ref={userVideo} autoPlay />
                </div>

                <div className="myVideo">
                  {stream && (
                    <>
                      {setStreamOn(true)}
                      <video
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        style={{ display: "block", width: "150px" }}
                      />
                    </>
                  )}
                </div>

                <div className="buttons">
                  <MicNoneOutlinedIcon className="Button" />
                  <VideocamOutlinedIcon className="Button" />
                  <CallEndIcon
                    className="Button endedCall"
                    onClick={leaveCall}
                  />
                  <VolumeDownOutlinedIcon className="Button" />
                  <MoreHorizOutlinedIcon className="Button" />
                </div>
                <div className="fade"></div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
