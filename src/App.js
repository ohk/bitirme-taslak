import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useMove from "./hooks/useMove";
import axios from "axios";

const downloadFile = async (myData) => {
  const fileName = "file";
  const json = JSON.stringify(myData);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function App() {
  const [state, setState] = useState({ x: 0, y: 0 });

  const [data, setData] = useState([
    { path: window.location.pathname, x: 0, y: 0, time: 1 },
  ]);

  const handleMouseMove = (e) => {
    e.persist();
    setState((state) => ({ ...state, x: e.clientX, y: e.clientY }));
    setData([
      ...data,
      { path: window.location.pathname, x: e.clientX, y: e.clientY },
    ]);
  };

  const doSomethingBeforeUnload = async () => {
    let nData = data;
    const a = () =>
      axios.post("http://localhost:80/", { data: nData }).then((response) => {
        console.log(response, data);
        downloadFile().then((r) => setData([]));
      });
    a();
  };

  const setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  };

  useEffect(() => {
    setupBeforeUnloadListener();
  }, []);

  return (
    <Router>
      <div className="rootContainer" onMouseMove={(e) => handleMouseMove(e)}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div className="mouseInfo">
          The current mouse position is ({state.x}, {state.y})
        </div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
