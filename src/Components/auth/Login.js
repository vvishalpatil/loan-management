import React from "react";
import AdminLogin from "./AdminLogin";
import Register from "./Register";
import UserLogin from "./UserLogin";

const Login = () => {
  // document.body.style.backgroundImage = "linear-gradient(to right, #2193b0, #6dd5ed)"
  return (
    <div className="container-fluid">
      <div className="row mt-4  no-gutters">
        <div className="col-sm-4 mx-auto">
          <div className="animate__animated animate__fadeIn">
            <div className="card shadow rounded p-3 ">
              <div className="container p-3">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#admin"
                    >
                      Admin
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#employee">
                      User
                    </a>
                  </li>
                </ul>
                <hr style={{ borderTop: "1px solid slateblue" }} />
                <div className="tab-content">
                  <AdminLogin />
                  <UserLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 mx-auto">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Login;
