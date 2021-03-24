import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const verifyLogin = async () => {
    const params = { user_name: username, password: password, type: "Admin" };
    try {
      const res = await axios.get("/authenticate", { params: params }); //API call for Admin login Authentication.
      console.log("verifyLogin", res.data);
      if (res.data.login === true) {
        let reqData = {
          id: res.data.id,
          username: res.data.user_name,
          type: "Admin",
        };
        localStorage.reqData = btoa(JSON.stringify(reqData)); //encrypting and storing the required data in local Storage
        setRedirect(true);
      } else {
        alert("Invalid Username or Password");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  if (redirect === false) {
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
          <button type="submit" onClick={verifyLogin} className="btn btn-primary">
            Login
          </button>
        
      </div>
    );
  } else if(redirect === true) {
    return <Redirect to= "/admin"/>;
  }
};

export default AdminLogin;
