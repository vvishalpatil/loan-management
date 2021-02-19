import React, { useEffect, useState } from 'react';
import LoanChart from '../../LoanChart';
import axios from 'axios';
import TenureChart from '../../TenureChart';
import Spinner from '../Spinner';
import Details from '../../Details/Details';
import { Link } from 'react-router-dom';

const UserDash = () => {

    const [userDetails, setUserDetails] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [loanType, setLoanType] = useState(null);

    useEffect(() => {
        console.log("useEffect", loanType);
        const getDetails = async (id) => {
            try {
                const params = { "id": id, "loantype": loanType };
                const res = await axios.get(`/getUserDetails/`, { params: params });
                setUserDetails(res.data.data);
                setLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        getDetails(1);

    }, [loanType]);

    const DisplayResults = () => {
        if (loaded) {
            const { paid_loan, total_loan, loan_tenure, tenure_completed } = userDetails;
            const loan = {
                paid: parseInt(paid_loan),
                remaining: parseInt(total_loan) - parseInt(paid_loan)
            }
            const tenure = {
                completed: parseInt(tenure_completed),
                remaining: parseInt(loan_tenure) - parseInt(tenure_completed)
            }
            return (
                <div>
                    <div className="container-fluid ">
                        <div className="row mt-2 ">
                            <div className="col-sm-3 mb-2">
                                <LoanChart loan={loan} />
                            </div>
                            <div className="col-sm-6 mb-2">
                                <Details userDetails={userDetails} />
                            </div>
                            <div className="col-sm-3">
                                <TenureChart tenure={tenure} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            console.log("else", "loading");
            return (
                <Spinner />
            );
        }
    }
   

    const handleChange = (e) => {
        setLoanType(e.target.value);
        setLoaded(false);
    }

    const nextDate = () => {
        let d = new Date();
        console.log(d);
        let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 30);
        console.log(d2.toLocaleDateString());
    }

    return (
        <div>
            <div className="row container-fluid">
                <div className="col-sm-6">
                    <div className="ml-auto">
                        <Link to="/newloan">
                            <button className="btn w-50 btn-block btn-outline-info mt-4">Apply for new Loan</button>
                        </Link>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="w-50 ml-auto mt-4">
                        <div className="form-group">
                            <select className="form-control" onChange={(e) => { handleChange(e) }} name="loanType">
                                <option >House Loan</option>
                                <option>Car Loan</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <DisplayResults />
        </div>
    );

}

export default UserDash;