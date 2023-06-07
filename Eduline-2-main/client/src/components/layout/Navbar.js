import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout_user } from "../../actions/authUser";
import { logout_educator } from "../../actions/authEducator";

import "../../App.css";

const Navbar = ({
  authUser: { isUserAuthenticated, loadingUser, user },
  logout_user,
  authEducator: { isEducatorAuthenticated, loadingEducator, educator },
  logout_educator,
}) => {
  const authUserLinks = (
    <Fragment>
      <Link className="nav-logo" to="/appointment">
        Eduline
        <img
          className="nav-log-img"
          style={{ width: "3.2rem" }}
          src={require("./doctor (1).png")}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/profiles" className="nav-link">
              Educators
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/appointment" className="nav-link ">
              Appointments
            </Link>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link font-weight-bolder"
              onClick={logout_user}
              href=""
            >
              <i className="fas fa-sign-out-alt" /> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
  const authEducatorLinks = (
    <Fragment>
      <Link className="nav-logo" to="/dashboard">
        Eduline
        <img
          className="nav-log-img"
          style={{ width: "3.2rem" }}
          src={require("./doctor (1).png")}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/dashboard" className="nav-link ">
              Dashboard
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/profiles" className="nav-link">
              Educators
            </Link>
          </li>
          <li className="nav-item dropdown active">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Update Profile
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="/edit-Profile">
                <i className="far fa-id-card"></i> Edit Profile
              </Link>
              <Link className="dropdown-item" to="/add-Education">
                <i className="fas fa-university"></i> Add Education
              </Link>
              <Link className="dropdown-item" to="/add-Experience">
                {" "}
                <i className="fab fa-black-tie"></i> Add Experience
              </Link>
            </div>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link font-weight-bolder"
              onClick={logout_educator}
              href=""
            >
              <i className="fas fa-sign-out-alt" /> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <Link className="nav-logo" to="/">
        Eduline
        <img
          className="nav-log-img"
          style={{ width: "3.2rem" }}
          src={require("./doctor (1).png")}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/profiles" className="nav-link">
              Educators
            </Link>
          </li>
          <li className="nav-item dropdown active">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Log in
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="/loginUser">
                <i className="fas fa-users"></i> Login as User
              </Link>
              <Link className="dropdown-item" to="/loginEducator">
                <i className="fas fa-user-md"></i> Login as Educator
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown active">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Register
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="/registerUser">
                <i className="fas fa-users"></i> Register as User
              </Link>
              <Link className="dropdown-item" to="/registerEducator">
                <i className="fas fa-user-md"></i> Register as Educator
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  return (
    <nav className="main navbar sticky-top navbar-expand-sm navbar-dark bg-dark mb-3">
      <div className="container">
        {isUserAuthenticated || isEducatorAuthenticated ? (
          <Fragment>
            {!loadingUser && (
              <Fragment>
                {isUserAuthenticated ? authUserLinks : authEducatorLinks}
              </Fragment>
            )}
          </Fragment>
        ) : (
          guestLinks
        )}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  logout_user: PropTypes.func.isRequired,
  logout_educator: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  authEducator: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  authEducator: state.authEducator,
});

export default connect(mapStateToProps, { logout_user, logout_educator })(
  Navbar
);
