import React from "react";
import { Link } from "react-router-dom";
import profile from "./profile.png";
import loanimg from "./loan.jfif";

const Navbar = () => {
  return (
    <nav
      className="navbar p-2 shadow navbar-dark navbar-expand-sm"
      style={{ backgroundColor: "#5161ce" }}
    >
      <div className="navbar-brand">
        <Link to="/">
          {" "}
          <img
            className="ml-3 rounded-circle"
            src={loanimg}
            width="45"
            height="45"
            alt="logo"
          />
        </Link>
        <span className="ml-2 h4"> Loan Management system</span>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-list-4"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-list-4">
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              role="button"
              data-toggle="dropdown"
            >
              <img
                src={profile}
                width="40"
                height="40"
                className="rounded-circle"
                alt="profile"
              />
              <span className="h6 text-light p-1 font-weight-normal">
                {" "}
                {localStorage.username}
              </span>
            </a>
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-item">
                Dashboard
              </Link>
              <Link to="/profile" className="dropdown-item">
                Edit Profile
              </Link>
              <Link to="/logout" className="dropdown-item">
                Log Out
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
