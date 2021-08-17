import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [user, setUser] = useState();

  // if (!user) return <Login />;

  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;
