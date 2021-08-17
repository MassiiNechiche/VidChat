import React, { useState } from "react";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./home.css";

function Home() {
  const [streamOn, setStreamOn] = useState(false);

  return (
    <>
      <Topbar stream={streamOn} />
      <Sidebar />
      <Landing setStreamOn={setStreamOn} />
    </>
  );
}

export default Home;
