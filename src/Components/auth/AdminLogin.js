import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStat, setLoginStat] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (username === "TheAdmin" && password === "AdminPass") {
      alert("success!");
      let obj = {
        id: 1,
        username: username,
        type: "Admin",
      };
      localStorage.reqData = btoa(JSON.stringify(obj)); //encrypting and storing the required data in local Storage.
      setLoginStat(true);
    } else {
      alert("invalid username or password");
    }
  };

  if (!loginStat) {
    return (
      <div
        id="admin"
        className="container tab-pane active animate__animated animate__pulse"
      >
        <br />
        <span className="d-flex mx-auto">
          {" "}
          <FontAwesomeIcon
            icon={faUserLock}
            size="3x"
            color="slateblue"
            className="m-auto"
          />
        </span>
        <br />
        <form onSubmit={(e) => login(e)}>
          <div className="form-group">
            <label htmlFor="uname" className="h6 text-left">
              Username :-
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="uname"
              placeholder="Enter username"
              name="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd" className="h6">
              Password :-
            </label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="Enter password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" value="Submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/admin" />;
  }
};

export default AdminLogin;
