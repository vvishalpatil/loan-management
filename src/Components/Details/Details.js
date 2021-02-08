import React  from 'react';

const tableStyle = {
    borderCollapse:"separate", 
    borderSpacing:"0 10px",
}

const Details = (props) => {

    const {loantype, loan, tenure} = props.userDetails;
    const {paid, remaining} = loan;
    const {completed, pending} = tenure;

    return (
        <div className="card  shadow ">
            <div className="card-body">
                <div className = "card-header shadow h5 rounded text-white" style={{backgroundColor:"#e66220"}}>Details</div>
                <hr className="w-75 d-flex mx-auto border-info"/>
                <p className="card-title h4 font-italic font-weight-light">Account Balance</p>
                <span className=" h5 font-weight-light"><span className="text-success h5">&#x20B9;</span> 30000</span>
                <br/><br/>
                <p className="card-title h4 font-italic font-weight-light">Loan Type</p>
                <span className=" h5 font-weight-light font-italic">{loantype}</span>
                 <br/><br/>
                <table className="table container table-responsive" style={tableStyle}>
                        <tbody className="text-left h6 table-bordered font-weight-normal">
                            <tr>
                                <td className="font-weight-bold">Loan (in Rs.)</td>
                                <td>Paid : {paid}</td>
                                <td>Remaining : {remaining}</td>
                                <td>Total : {remaining + paid}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold" >Tenure (in years)</td>
                                <td>Completed : {completed} </td>
                                <td>Pending : {pending} </td>
                                <td>Total : {completed + pending}</td>
                            </tr>
                        </tbody>
                </table>
            </div>
         </div>  
    )
}

export default Details;
