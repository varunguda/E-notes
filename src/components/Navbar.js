import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar fixed-top navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          E NOTES
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
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
          <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-secondary mx-1" to="/signup" role="button">Sign up</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
