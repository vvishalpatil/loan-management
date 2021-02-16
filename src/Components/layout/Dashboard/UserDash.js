import React, {useEffect, useState} from 'react';
import LoanChart from '../../LoanChart';
import axios from 'axios';
import TenureChart from '../../TenureChart';
import Spinner from '../Spinner';
import Details from '../../Details/Details';

const UserDash = () => {

    const [userDetails, setUserDetails] = useState({});
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const getDetails = async(id) => {
            const res = await axios.get(`/getUserDetails/${id}`);
            setUserDetails(res.data.data);
            setStatus(true);
        }
        getDetails(1);

        return () => {
            console.log("unmount");
        }
    }, []);


    if(status){
        const loan={
            paid:parseInt(userDetails.paid_loan),
            remaining:parseInt(userDetails.remaining_loan)
        }
        const tenure={
            completed:parseInt(userDetails.tenure_completed),
            pending:parseInt(userDetails.tenure_remaining)
        }
        return (
            <div>
                <h6 className="text-right container-fluid font-weight-normal font-italic mt-2 p-2">Logged in as : User</h6>
                <div className="container-fluid mt-2">
                    <div className="row mt-2 ">
                        <div className="col-sm-3 mb-2"> 
                            <LoanChart loan = {loan} />
                        </div>
                        <div className="col-sm-6 mb-2">
                            <Details userDetails = {userDetails}/>   
                        </div>
                        <div className="col-sm-3"> 
                            <TenureChart tenure = {tenure}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else {
        console.log("else", "loading");
        return (
            <Spinner/>
        )
    }
}

export default UserDash;