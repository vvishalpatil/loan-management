import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import AdminChart from '../../AdminChart';

const AdminDash = () => {

    const [userList, setUserList] = useState([]);
    const [loanChart, setLoanChart] = useState({});
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axios.get('/getUsers');
            console.log(res.data)
            setUserList(res.data.users);
            setLoanChart(res.data.loan_summary);
            setStatus(true);
        }
        getAllUsers();

        return () => {
            console.log("unmount");
        }
    }, []);

    const createTable = (user, index) => {
        return (
            <React.Fragment key={index}>
            <tr>
                <td className="text-justify">{user.user_id}</td>
                <td className="text-justify">{user.first_name}{user.last_name}</td>
                <td className="text-justify">Rs. {user.remaining_loan}</td>
                <td className="text-justify">Rs. {user.paid_loan}</td>
                <td className="text-justify">Rs. {parseInt(user.remaining_loan) + parseInt(user.paid_loan)}</td>
                <td className="d-flex ">
                <button type="button" className="container ml-2 btn btn-outline-info" data-toggle="modal" data-target={String(user.user_id)}>
                    View Chart
                </button>
                    <button className="container ml-2 btn btn-outline-danger" >Delete</button>
                </td>
            </tr>
            <div className="modal animate__animated animate__zoomIn" id={String(user.user_id)}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="card-body mx-auto container bg-white">
                      <h2>Forecast Chart</h2>
                      {/* <Line data={this.state.chartData}  /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
           </React.Fragment>
        )
    }

    if (status) {
        return (
            <div>
                <br />
                <h6 className="text-right container-fluid font-weight-normal font-italic">Logged in as : Admin</h6>
                <div className="container-fluid mt-2">
                    <div className="row mt-2 ">
                        <div className="col-sm-3 mb-2">
                            <AdminChart loan={loanChart} />
                        </div>
                        <div className="col-sm-9 mb-2">
                            <div className="container-fluid">
                                <table className="table mt-2 shadow table-striped   bg-light animate__animated animate__fadeIn">
                                    <thead className="text-left text-light" style={{ backgroundColor: "#5161ce" }}>
                                        <tr>
                                            <th className="h6">ID</th>
                                            <th className="h6">Name</th>
                                            <th className="h6">Loan Remaining</th>
                                            <th className="h6">Loan Paid</th>
                                            <th className="h6">Total</th>
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
            </div>
        )
    } else {
        console.log("else", "loading");
        return (
            <Spinner />
        )
    }
}

export default AdminDash;