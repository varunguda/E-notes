import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { userFetched } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="nav-link navbar-brand" to="/">
            E NOTES
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
            <span className="navbar-toggler-icon" />
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
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              {userFetched ? (
                <>
                  <abbr title="Logout">
                    <button
                      type="button"
                      className="btn btn-warning mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalLogout"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </abbr>
                </>
              ) : (
                <>
                  {location.pathname !== "/login" &&
                  location.pathname !== "/signup" ? (
                    <>
                      <Link
                        className="btn mx-1 btn-warning"
                        to="/login"
                        role="button"
                      >
                        Log in
                      </Link>
                      <Link
                        className="btn btn-light mx-1"
                        to="/signup"
                        role="button"
                      >
                        Sign up
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
