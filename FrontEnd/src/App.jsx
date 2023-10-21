import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import ContextState from "./Context/ContextState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export default function App() {
  const [alert, setalert] = useState(null);

  const showalert = (message, type) => {
    setalert({
      alertmsg: message,
      alerttype: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>
      <ContextState>
        <BrowserRouter>
          <Navbar showalert={showalert}  />
          <Alert Alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert} />} />
              <Route exact path="/About" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showalert={showalert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showalert={showalert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ContextState>
    </>
  );
}
