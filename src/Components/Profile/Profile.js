import React, { useEffect, useState } from 'react';
import avatar from './avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt,faEnvelope,faUser, faVenusMars} from '@fortawesome/free-solid-svg-icons';
import UpdateProfile from './UpdateProfile';
import axios from "axios";
import Spinner from '../layout/Spinner';

const Profile = () => {

    const [userProfile, setUserProfile] = useState({});
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const getProfile = async() => {
            const res = await axios.get('https://demo8567258.mockable.io/userProfile');
            setUserProfile(res.data);
            setStatus(true);
        }
        getProfile();

        return () => {
            console.log("unmount");
        }
    }, []);


    if(status){
        return (
            <div className="container-fluid row mt-3" >
                {/* <div className="col-sm-1"></div> */}
                <div className="col-sm-5 mx-auto">
                <div className="card shadow  animate__animated animate__fadeIn" >
                    <div className="card-header h3 font-weight-normal font-italic text-center bg-info text-light">Profile</div>
                    <div className="card-body  text-justify" style={{fontSize:"16px"}}>
                        <center><img src={avatar}  height="20%" width="20%" className="rounded-circle shadow" alt="avatar"/></center>
                        <p className="card-text text-justify text-center  font-weight-normal h3 mt-3">Vivek Thakare</p>
                        {/* <p className="card-text text-justify  text-center h5 text-success font-weight-normal mt-2">Associate software Engg.</p> */}
                        <hr  style={{borderTop: "2px solid slateblue"}} />
                        <div className="ml-3">
                            <p className="card-text"><FontAwesomeIcon icon= {faEnvelope} className="text-info mr-2"/> <b>Email</b> :- Vivek@gmail.com </p>
                            <p className="card-text"><FontAwesomeIcon icon= {faVenusMars} className="text-info mr-2"/><b>Gender</b> :- Male </p>
                            <p className="card-text"><FontAwesomeIcon icon= {faUser} className="text-info mr-2"/><b>Username</b> :- Vivek@123</p>
                            <p className="card-text"><FontAwesomeIcon icon= {faCalendarAlt} className="text-info mr-2"/><b>Date of Birth</b> :- 02/11/2020 </p>
                        </div>
                    </div>   
                </div>
                </div>
                <div className="col-sm-5 mx-auto">
                    <UpdateProfile profile={userProfile}/>
                </div>
            <br/>
        </div>
        )
    }else {
        return (
            <Spinner/>
        )
    }
}

export default Profile;
