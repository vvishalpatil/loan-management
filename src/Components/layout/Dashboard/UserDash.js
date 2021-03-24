import React, { useEffect, useState } from "react";
import LoanChart from "../../Charts/LoanChart";
import axios from "axios";
import TenureChart from "../../Charts/TenureChart";
import Spinner from "../Spinner";
import Details from "../../Details/Details";
import { Link, useLocation } from "react-router-dom";

const UserDash = () => {
  const { id } = JSON.parse(atob(localStorage.reqData)); //decrypting and getting the User id from Local Storage.

  const location = useLocation(); // contains the selected loanTypeId after redirection from Payment Component.
  const [loanTypeId, setloanTypeId] = useState(null);
  const [loanOptions, setLoanOptions] = useState(null);

  useEffect(() => {
    //API call for getting the loan options to populate the select box fields.
    const getLoanOptions = async (id) => {
      try {
        const res = await axios.get(`/getUserLoanOptions/${id}`);
        console.log(res.data.loan_options);
        setLoanOptions(res.data.loan_options);
        console.log("loan Options", loanOptions);
        if (location.state === undefined) {
          setloanTypeId(res.data.loan_options[0].loan_id);
          console.log(loanTypeId);
        } else {
          setloanTypeId(location.state.loanId);
          console.log(loanTypeId);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLoanOptions(Number(id));
  }, []);

  const [userDetails, setUserDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState(null);

  useEffect(() => {
    //API call for getting the user details of the selected loan type. It will be called whenever the loanTypeId is changed
    const getLoanDetails = async (id) => {
      try {
        if (loanTypeId) {
          const params = { id: id, loanId: loanTypeId };
          const res = await axios.get(`/getUserLoanDetails/`, {
            params: params,
          });
          console.log(res.data);
          setUserDetails(res.data.data);
          setTransactionHistory(res.data.transaction_history);
          setLoaded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLoanDetails(Number(id));
  }, [loanTypeId]);

  const handleChange = (e) => {
    setloanTypeId(e.target.value);
    console.log("handlechange loanTypeId : ", loanTypeId);
    setLoaded(false);
  };

  const mapLoanOptions = () => {
    //populating the dropdown with options after redirection from Payment component
    if (loanOptions) {
      if (loanTypeId !== undefined) {
        const { loanId } = location.state;
        return (
          <React.Fragment>
            {loanOptions.map((option, index) => {
              return (
                <React.Fragment key={index}>
                  {option.loan_id !== loanId ? (
                    <option
                      className="h6 text-success"
                      key={index}
                      value={option.loan_id}
                    >
                      {`${option.loan_type} (id : ${option.loan_id} ) ${option.loan_status}`}
                    </option>
                  ) : (
                    <option
                      className="h6 text-success"
                      key={index}
                      value={option.loan_id}
                      selected
                    >
                      {option.loan_type +
                        "    (id : " +
                        option.loan_id +
                        ")     " +
                        option.loan_status}
                    </option>
                  )}
                </React.Fragment>
              );
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
      console.log(userDetails);
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
            {true ? (
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
                You don't have any {loanTypeId} pending
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
                name="loanTypeId"
              >
                {loanOptions && location.state === undefined //populating the dropdown with dynamic options
                  ? loanOptions.map((option, index) => (
                      <option
                        className="h6 text-success"
                        key={index}
                        value={option.loan_id}
                      >
                        {option.loan_type +
                          "    (id : " +
                          option.loan_id +
                          ")     " +
                          option.loan_status}
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
