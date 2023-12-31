import React from "react";
import { useNavigate } from "react-router-dom";
// import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const { showalert } = props;
  // For navigation or Redirecting to a different location
  let navigateTo = useNavigate();

  // Get location or pathname
  let location = useLocation();

  const logoutbtn = () => {
    localStorage.removeItem("TOKEN");

    navigateTo("/login");

    showalert("Logout Successfully", "success");
  };

  // useEffect(() => {
  // Use for testing purposes only  (location.pathname)
  // console.log(location.pathname);
  // }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About Us
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("TOKEN") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary button-62 mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary button-62"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary button-62 " onClick={logoutbtn}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
