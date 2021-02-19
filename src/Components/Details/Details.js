import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Payment from "./Payment";

const tableStyle = {
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const Details = (props) => {
  const[toggled, setToggled] = useState(false);

  const {total_loan,paid_loan,loan_tenure,tenure_completed,installment_due_date,installment_amt} = props.userDetails;
  const tenure_remaining= loan_tenure-tenure_completed;
  const remaining_loan=total_loan-paid_loan;


  const Pay = () => {
    const { installment_amt, installment_due_date,user_id,loan_id } = props.userDetails;
    const payment_data= { installment_amt, installment_due_date,user_id,loan_id }
    
    return (
        <div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="card-header h6 rounded text-white"
                        style={{ backgroundColor: "#76b900" }}>
                        Current Installment
                    </div>
                    <hr></hr>
                    <p className="card-text my-2">Amount : Rs. {installment_amt} </p>
                    <p className="card-text">Due Date: {installment_due_date} </p>
                    
                    <Link to={{pathname:'/payment',payment_data:payment_data}}  className="btn btn-primary mt-1" >Pay Now</Link>
                    
                </div>
            </div>
            <div className="container mt-4">
                <button className="btn btn-outline-success btn-block ">Close Loan</button>
            </div>
        </div>
    );
  }

  return (
    <div className="card  shadow ">
      <div className="card-body">
        <div
          className="card-header shadow h5 rounded text-white"
          style={{ backgroundColor: "#e66220" }}
        >
          Details
        </div>
        <table className=" mt-3 table container table-responsive" style={tableStyle}>
          <tbody className="text-left h6 table-bordered font-weight-normal">
            <tr>
              <td className="font-weight-bold">Loan (in Rs.)</td>
              <td>Loan Amount : {parseInt(remaining_loan) + parseInt(paid_loan)}</td>
              <td>Paid : {paid_loan}</td>
              <td>Remaining : {remaining_loan}</td>
              
            </tr>
            <tr>
              <td className="font-weight-bold">Tenure (in years)</td>
              <td>Total : {parseInt(tenure_completed) + parseInt(tenure_remaining)}</td>
              <td>Completed : {tenure_completed} </td>
              <td>Remaining : {tenure_remaining} </td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-lg-7">
            <div className="card shadow-sm">

              <div className="card-body">
                <div className="card-header h6 rounded text-white"
                  style={{ backgroundColor: "#5161ce" }}>
                  Transaction History
              </div>
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      {/* <th scope="col">Note</th> */}
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Rs. 5000</td>
                      <td>3/4/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Rs. 1300</td>
                      <td>2/6/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Rs. 4000</td>
                      <td>12/9/2020</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <Pay/>
          </div>
        </div>
      </div>
      {toggled ? <Redirect to="/"/>
               : null}
    </div>
  );
};




export default Details;
