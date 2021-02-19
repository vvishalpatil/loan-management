import React from "react";

const tableStyle = {
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const Details = (props) => {
  const {total_loan,paid_loan,loan_tenure,tenure_completed,installment_due_date,installment_amt} = props.userDetails;
  const tenure_remaining = loan_tenure - tenure_completed;
  const remaining_loan = total_loan - paid_loan;
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
          <div className="col-sm-7">
            <div className="card mt-4 shadow-sm">
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
            <div className="card mt-4 shadow-sm">
              <div className="card-body">
                <div className="card-header h6 rounded text-white"
                  style={{ backgroundColor: "#76b900" }}>
                  Current Installment
              </div>
                <hr></hr>
                <p className="card-text my-2">Amount : Rs. {installment_amt} </p>
                <p className="card-text">Due Date: {installment_due_date} </p>
                <button className="btn btn-primary mt-1">Pay Now</button>
              </div>
            </div>
            <div className="container mt-4">
              <button className="btn btn-outline-success btn-block ">Close Loan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
