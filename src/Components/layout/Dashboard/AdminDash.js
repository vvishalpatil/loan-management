import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import AdminChart from '../../AdminChart';

const AdminDash = () => {

    const [userList, setUserList] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const getAllUsers = async() => {
            const res = await axios.get('https://demo8567258.mockable.io/getAllUsers');
            setUserList(res.data);
            setStatus(true);
        }
        getAllUsers();

        return () => {
            console.log("unmount");
        }
    }, []);

    const createTable = (user, index) => {
        const {paid, remaining} = user.loan;
        return (
            <tr key={index}>
                <td className="text-justify">{user.id}</td>
                <td className="text-justify">{user.firstname}{user.lastname}</td>
                <td className="text-justify">Rs. {remaining}</td>
                <td className="text-justify">Rs. {paid}</td>
                <td className="text-justify">Rs. {paid + remaining}</td>
                <td className="d-flex ">
                    <button className="container btn  btn-outline-primary">Edit</button>
                    <button className="container ml-2 btn btn-outline-danger" >Delete</button>
                </td>
            </tr>
        )
    }

    if(status){
        console.log(userList.users);
        const {users} = userList;
        return (
            <div>
                <br/>
                <h6 className="text-right container-fluid font-weight-normal font-italic">Logged in as : Admin</h6>
                <div className="container-fluid mt-2">
                    <div className="row mt-2 ">
                        <div className="col-sm-3 mb-2"> 
                            {/* <AdminChart loan = {loan} /> */}
                        </div>
                        <div className="col-sm-9 mb-2">
                            <div className="container-fluid">
                                <table className="table mt-2 shadow table-striped   bg-light animate__animated animate__fadeIn">
                                    <thead className="text-left text-light" style={{backgroundColor:"#5161ce"}}>
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
                                        {users.map(createTable)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else {
        console.log("else", "loading");
        return (
            <Spinner/>
        )
    }
}

export default AdminDash;