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
  const transaction_history = props.transactionHistory

  console.log(transaction_history,'details component')
  console.log(transaction_history)

  const Pay = () => {
    const { installment_amt, installment_due_date,user_id,loan_id } = props.userDetails;
    const payment_data= { installment_amt, installment_due_date,user_id,loan_id }
    
    return (
        <div>
            <div className="card shadow-sm mt-4">
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
    <div className="card shadow">
      <div className="card-body">
        <div
          className="card-header shadow h5 rounded text-white"
          style={{ backgroundColor: "#e66220" }}
        >
          Details
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <div className="card-header h6 rounded text-white"
                  style={{backgroundColor: "#5161ce" }}>
                  Loan (in Rs.)
              </div>
                <hr></hr>
                <div className="text-left ml-2  font-italic">
                  <p className="card-text">Loan Amount : {parseInt(remaining_loan) + parseInt(paid_loan)} Rs. </p>
                  <p className="card-text">Paid : {paid_loan} Rs. </p>
                  <p className="card-text">Remaining : {remaining_loan} Rs. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card shadow-sm mt-3">
                <div className="card-body">
                  <div className="card-header h6 rounded text-white"
                    style={{backgroundColor: "#76b900" }}>
                    Tenure (in Years.)
                </div>
                  <hr></hr>
                  <div className="text-center  font-italic">
                    <p className="card-text">Total : {parseInt(tenure_completed) + parseInt(tenure_remaining)} </p>
                    <p className="card-text">Completed : {tenure_completed} </p>
                    <p className="card-text">Remaining : {tenure_remaining} </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-6">
            <div className="card mt-4 shadow-sm">
              <div className="card-body">
                <div className="card-header h6 rounded text-white"
                  style={{ backgroundColor: "#5161ce" }}>
                  Transaction History
              </div>
                <table className="table table-responsive ">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                      
                      {transaction_history?transaction_history.map((res,index)=>(
                        <tr key={index}>
                           <th scope="row">{res.tid}</th>
                           <td>Rs.{res.paid_amount} </td>
                           <td>{res.date.slice(4,16)}</td>
                        </tr>
                        )):null
                        }
                     
                    
                   
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
