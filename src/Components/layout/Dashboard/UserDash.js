import React, { useEffect, useState } from 'react';
import LoanChart from '../../LoanChart';
import axios from 'axios';
import TenureChart from '../../TenureChart';
import Spinner from '../Spinner';
import Details from '../../Details/Details';
import { Link } from 'react-router-dom';

const UserDash = () => {

  
    const [loanType, setLoanType] = useState(null);
    const [loanOptions, setLoanOptions] = useState(null);

    useEffect(() => {
        const getLoanOptions = async(id) => {
            try{
                const res = await axios.get(`/getLoanOptions/${id}`);
                setLoanOptions(res.data.loan_options);
                setLoanType(res.data.loan_options[0]);
            }catch(err){
                console.log(err);
            }
        }
        getLoanOptions(2);
    }, []);


    const [userDetails, setUserDetails] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [transactionHistory,setTransactionHistory] = useState(null);

    useEffect(() => {
        const getLoanDetails = async(id) => {
            try{
                const params = {"id":id, "loantype":loanType};
                const res = await axios.get(`/getUserLoanDetails/`,{params : params});
                setUserDetails(res.data.data);
                setTransactionHistory(res.data.transaction_history)
                console.log(res.data.transaction_history,'user dash state')
                console.log(res.data)
                setLoaded(true);
                
            } catch (err) {
                console.log(err);
            }
        }
        getLoanDetails(2);

    }, [loanType]);

    const DisplayResults = () => {
        if(loaded){
            if(userDetails){
                const {paid_loan, total_loan, loan_tenure, tenure_completed} = userDetails;
                const loan={
                    paid:parseInt(paid_loan),
                    remaining:parseInt(total_loan) - parseInt(paid_loan)
                }
                const tenure={
                    completed:parseInt(tenure_completed),
                    remaining:parseInt(loan_tenure) - parseInt(tenure_completed)
                }
                return (
                    <div>
                        <div className="container-fluid ">
                            <div className="row mt-2 ">
                                <div className="col-sm-3 mb-2"> 
                                    <LoanChart loan = {loan} />
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <Details userDetails = {userDetails} transactionHistory={transactionHistory}/>   
                                </div>
                                <div className="col-sm-3"> 
                                    <TenureChart tenure = {tenure}/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return null;
            }
        }else {
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
                        <Link to="/newloan" className="btn shadow-sm w-50 btn-block btn-outline-info mt-4">New Loan</Link>
                    </div>
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                    <div className="mt-4">
                        <div className="form-group">
                            <select className="form-control shadow-sm" onChange={(e) => {handleChange(e)}} name="loanType">
                                {   loanOptions ? 
                                    loanOptions.map((option, index) => (
                                        <option className="h6 text-success" key={index} value={option}>{option}</option>
                                    ))
                                    : null
                                }
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