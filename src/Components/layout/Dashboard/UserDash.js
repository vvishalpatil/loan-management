import React, { useEffect, useState } from "react";
import LoanChart from "../../Charts/LoanChart";
import axios from "axios";
import TenureChart from "../../Charts/TenureChart";
import Spinner from "../Spinner";
import Details from "../../Details/Details";
import { Link, useLocation, useParams } from "react-router-dom";

const UserDash = () => {
  // const {id} = useParams();
  const location = useLocation(); // contains the selected loanType after redirection from Payment Component.
  const [loanType, setLoanType] = useState(null);
  const [loanOptions, setLoanOptions] = useState(null);

  useEffect(() => {
    //API call for getting the loan options to populate the select box fields.
    const getLoanOptions = async (id) => {
      try {
        const res = await axios.get(`/getUserLoanOptions/${id}`);
        setLoanOptions(res.data.loan_options);
        // console.log(loanOptions, "loan options");
        if (location.state == undefined) {
          setLoanType(res.data.loan_options[0]);
        } else {
          setLoanType(location.state.loanType);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLoanOptions(Number(localStorage.userId));
    localStorage.userId = 2; //change user id from here for now
  }, []);

  
  const [userDetails, setUserDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState(null);

  useEffect(() => {
    //API call for getting the user details of the selected loan type. It will be called whenever the loanType is changed
    const getLoanDetails = async (id) => {
      try {
        if (loanType) {
          const params = { id: id, loantype: loanType };
          const res = await axios.get(`/getUserLoanDetails/`, {
            params: params,
          });
          setUserDetails(res.data.data);
          setTransactionHistory(res.data.transaction_history);
          // console.log(res.data.transaction_history, "user dash state");
          // console.log(res.data.data);
          setLoaded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLoanDetails(Number(localStorage.userId));
  }, [loanType]);

  const handleChange = (e) => {
    setLoanType(e.target.value);
    setLoaded(false);
  };

  const mapLoanOptions = () => {
    //populating the dropdown with options after redirection from Payment component
    if (loanOptions) {
      if (loanType != undefined) {
        const { loanType } = location.state;
        return (
          <React.Fragment>
            <option className="h6 text-success" value={loanType}>
              {loanType}
            </option>
            {loanOptions.map((option, index) => {
              if (option != loanType) {
                return (
                  <option
                    className="h6 text-success"
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </React.Fragment>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const DisplayData = () => {
    if (loaded) {
      if (userDetails) {
        localStorage.username = `${userDetails.first_name} ${userDetails.last_name}`;
        const {
          paid_loan,
          total_loan,
          loan_tenure,
          tenure_completed,
        } = userDetails;
        const loan = {
          paid: parseInt(paid_loan),
          remaining: parseInt(total_loan) - parseInt(paid_loan),
        };
        const tenure = {
          completed: parseInt(tenure_completed),
          remaining: parseInt(loan_tenure) - parseInt(tenure_completed),
        };
        return (
          <div>
            {userDetails.loan_status == "active" ? (
              <div className="container-fluid ">
                <div className="row mt-2 ">
                  <div className="col-sm-3 mb-2">
                    <LoanChart loan={loan} />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <Details
                      userDetails={userDetails}
                      transactionHistory={transactionHistory}
                    />
                  </div>
                  <div className="col-sm-3">
                    <TenureChart tenure={tenure} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="container jumbotron h4 font-weight-normal">
                You don't have any {loanType} pending
              </div>
            )}
          </div>
        );
      } else {
        return null;
      }
    } else {
      return <Spinner />;
    }
  };

  return (
    <div>
      <div className="row container-fluid">
        <div className="col-sm-6">
          <div className="ml-auto">
            <Link
              to="/newloan"
              className="btn shadow-sm w-50 btn-block btn-outline-info mt-4"
            >
              New Loan
            </Link>
          </div>
        </div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3">
          <div className="mt-4">
            <div className="form-group">
              <select
                className="form-control shadow-sm"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="loanType"
              >
                {loanOptions && location.state == undefined //populating the dropdown with dynamic options
                  ? loanOptions.map((option, index) => (
                      <option
                        className="h6 text-success"
                        key={index}
                        value={option}
                      >
                        {option}
                      </option>
                    ))
                  : mapLoanOptions()}
              </select>
            </div>
          </div>
        </div>
      </div>
      {loanOptions != null ? (
        <DisplayData />
      ) : (
        <div className="jumbotron container h4">
          Not Applied for any loans yet....
        </div>
      )}
    </div>
  );
};

export default UserDash;
