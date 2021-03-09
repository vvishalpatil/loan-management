import React from "react";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmpLogin = () => {

  return (
    <div
      id="employee"
      className="container tab-pane fade  animate__animated animate__pulse"
    >
      <br />
      <span className=" d-flex mx-auto">
        <FontAwesomeIcon
          icon={faUserLock}
          size="3x"
          color="slateblue"
          className="mx-auto"
        />
      </span>
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="username" className="h6">
            Username :-
          </label>
          <input
            type="email"
            required
            className="form-control"
            placeholder="Enter username"
            name="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="h6">
            Password :-
          </label>
          <input
            type="password"
            required
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default EmpLogin;
