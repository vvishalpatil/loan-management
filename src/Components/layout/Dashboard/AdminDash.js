import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import AdminChart from '../../AdminChart';
import LoanChart from '../../LoanChart';
import TenureChart from '../../TenureChart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEnvelope, faUser, faVenusMars, faLandmark, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDash = () => {

    const [userList, setUserList] = useState(null);
    const [loanChart, setLoanChart] = useState(null);
    const [status, setStatus] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get('/getUsers');
                // console.log(res.data)
                setUserList(res.data.users);
                setLoanChart(res.data.loan_summary);
                setStatus(true);
            } catch (err) {
                console.log("AdminDash", err);
            }
        }
        getAllUsers();
    }, []);

    const createTable = (user, index) => {
        if (user) {
            const { user_id, first_name, last_name, total_loan, paid_loan } = user;
            const remaining_loan = total_loan - paid_loan;
            return (
                <tr key={index}>
                    <td className="text-justify">{user_id}</td>
                    <td className="text-justify">{first_name}{last_name}</td>
                    <td className="text-justify">Rs. {parseInt(remaining_loan) + parseInt(paid_loan)}</td>
                    <td className="text-justify">Rs. {paid_loan}</td>
                    <td className="text-justify">Rs. {remaining_loan}</td>

                    <td className="d-flex ">
                        <button type="button" className="container ml-2 btn btn-outline-info"
                            onClick={() => setModalData(user)}
                            data-toggle="modal"
                            data-target="#user"
                        >
                            View Chart
                    </button>
                        <button className="container ml-2 btn btn-outline-success" >Close Loan</button>
                    </td>
                </tr>
            );
        } else {
            return null;
        }
    }

    const displayModal = () => {
        if (modalData) {
            console.log("display modal", modalData);
            const { paid_loan, total_loan, tenure_completed, loan_tenure,
                first_name, user_id, last_name, email, mobile, loan_type, issue_date } = modalData;
            const tenure_remaining = loan_tenure - tenure_completed;
            const remaining_loan = total_loan - paid_loan;
            const loan = {
                paid: parseInt(paid_loan),
                remaining: parseInt(remaining_loan)
            }

            const tenure = {
                completed: parseInt(tenure_completed),
                remaining: parseInt(tenure_remaining)
            }


            return (
                <div className="modal animate__animated animate__fadeIn" id="user">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-light" style={{ backgroundColor: "#5161ce" }}>
                                <p className="modal-title h4">Details</p>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span className="h4 text-light p-2">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row border ml-1 mr-1 px-2 rounded">
                                    <div className="col-sm-3">
                                        <p className="card-text text-justify text-center font-weight-normal h4 mt-4 pt-2">{first_name} {last_name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td className="text-left">
                                                        <FontAwesomeIcon icon={faEnvelope} className="text-info " />
                                                        <b> Email</b> :- {email}
                                                    </td>
                                                    <td className="text-left">
                                                        <FontAwesomeIcon icon={faMobileAlt} className="text-info " />
                                                        <b> Mobile</b> :- {mobile}
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td className="text-left">
                                                        <FontAwesomeIcon icon={faLandmark} className="text-info" />
                                                        <b> Loan Type </b> :- {loan_type}
                                                    </td>
                                                    <td className="text-left">
                                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-info" />
                                                        <b> Issue Date</b> :- {issue_date.slice(5, 16)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-5 mx-auto">
                                        <LoanChart key={user_id} loan={loan} />
                                    </div>
                                    <div className="col-sm-5 mx-auto">
                                        <TenureChart key={user_id} tenure={tenure} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    if (status) {
        return (
            <div>
                <div className="container-fluid mt-4">
                    <div className="row mt-2 ">
                        <div className="col-sm-3 mb-2">
                            <AdminChart loan={loanChart} />
                        </div>
                        <div className="col-sm-9 mb-2">
                            <div className="container-fluid">
                                <table className="table mt-2 shadow table-striped bg-light animate__animated animate__fadeIn">
                                    <thead className="text-left text-light" style={{ backgroundColor: "#5161ce" }}>
                                        <tr>
                                            <th className="h6">ID</th>
                                            <th className="h6">Name</th>
                                            <th className="h6">Loan Amount</th>
                                            <th className="h6">Loan Paid</th>
                                            <th className="h6">Loan Remaining</th>
                                            <th className="h6 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map(createTable)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {displayModal()}
            </div>
        );
    } else {
        console.log("else", "loading");
        return (
            <Spinner />
        );
    }
}

export default AdminDash;