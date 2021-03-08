import React, { useEffect, useState } from "react";
import avatar from "./avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEnvelope,
  faUser,
  faVenusMars,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";
import Spinner from "../layout/Spinner";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
       
        const res = await axios.get(`/getUserProfile/${localStorage.userId}`);
        setUserProfile(res.data.data);
        setStatus(true);
      } catch (err) {
        console.log("user profile", err);
      }
    };
    getProfile();
  }, []);

  if (status) {
    const { first_name, last_name, dob, email, gender, mobile } = userProfile;
   
    return (
      <div className="container-fluid row mt-4">
        {/* <div className="col-sm-1"></div> */}
        <div className="col-sm-4 mx-auto">
          <div className="card shadow  animate__animated animate__fadeIn">
            <div className="card-header h3 font-weight-normal font-italic text-center bg-info text-light">
              Profile
            </div>
            <div
              className="card-body  text-justify"
              style={{ fontSize: "16px" }}
            >
              <center>
                <img
                  src={avatar}
                  height="20%"
                  width="20%"
                  className="rounded-circle shadow"
                  alt="avatar"
                />
              </center>
              <p className="card-text text-justify text-center  font-weight-normal h3 mt-3">
                {first_name} {last_name}
              </p>
              {/* <p className="card-text text-justify  text-center h5 text-success font-weight-normal mt-2">Associate software Engg.</p> */}
              <hr style={{ borderTop: "2px solid slateblue" }} />
              <div className="ml-1 font-italic">
                <p className="card-text">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-info mr-2"
                  />{" "}
                  <b>Email</b> :- {email}{" "}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="text-info mr-2"
                  />
                  <b>Gender</b> :- {gender}{" "}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faUser} className="text-info mr-2" />
                  <b>Username</b> :- Vivek@123
                </p>
                <p className="card-text">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-info mr-2"
                  />
                  <b>Date of Birth</b> :- {dob}{" "}
                </p>
                <p className="card-text">
                  <FontAwesomeIcon
                    icon={faMobileAlt}
                    className="text-info mr-2"
                  />
                  <b>Mobile</b> :- {mobile}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 mx-auto">
          <UpdateProfile profile={userProfile} />
        </div>
        <br />
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Profile;
