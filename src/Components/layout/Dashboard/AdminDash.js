import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import AdminChart from "../../AdminChart";
import LoanChart from "../../LoanChart";
import TenureChart from "../../TenureChart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEnvelope,
  faLandmark,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminDash = () => {
  const [userList, setUserList] = useState(null);
  const [loanChart, setLoanChart] = useState(null);
  const [status, setStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchData, setSearchData] = useState(null);
  let [tableData, setTableData] = useState(null);
  const [searchStatus, setSearchStatus] = useState(true);
  const [comparator, setComparator] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/getUsers");
        // console.log(res.data)
        setUserList(res.data.users);
        setTableData(res.data.users);
        setLoanChart(res.data.loan_summary);
        setStatus(true);
      } catch (err) {
        console.log("AdminDash", err);
      }
    };
    getAllUsers();
  }, []);

  const createTable = (user, index) => {
    if (user) {
      const { user_id, first_name, last_name, total_loan, paid_loan } = user;
      const remaining_loan = total_loan - paid_loan;
      return (
        <tr key={index}>
          <td className="text-justify">{user_id}</td>
          <td className="text-justify">
            {first_name} {last_name}
          </td>
          <td className="text-justify">
            Rs. {parseInt(remaining_loan) + parseInt(paid_loan)}
          </td>
          <td className="text-justify">Rs. {paid_loan}</td>
          <td className="text-justify">Rs. {remaining_loan}</td>

          <td className="d-flex ">
            <button
              type="button"
              className="container ml-2 btn btn-outline-info"
              onClick={() => setModalData(user)}
              data-toggle="modal"
              data-target="#user"
            >
              View Chart
            </button>
            <button className="container ml-2 btn btn-outline-success">
              Close Loan
            </button>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  };

  const displayModal = () => {
    if (modalData) {
      console.log("display modal", modalData);
      const {
        paid_loan,
        total_loan,
        tenure_completed,
        loan_tenure,
        first_name,
        user_id,
        last_name,
        email,
        mobile,
        loan_type,
        issue_date,
      } = modalData;
      const tenure_remaining = loan_tenure - tenure_completed;
      const remaining_loan = total_loan - paid_loan;
      const loan = {
        paid: parseInt(paid_loan),
        remaining: parseInt(remaining_loan),
      };

      const tenure = {
        completed: parseInt(tenure_completed),
        remaining: parseInt(tenure_remaining),
      };

      return (
        <div className="modal animate__animated animate__fadeIn" id="user">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div
                className="modal-header text-light"
                style={{ backgroundColor: "#5161ce" }}
              >
                <p className="modal-title h4">Details</p>
                <button type="button" className="close" data-dismiss="modal">
                  <span className="h4 text-light p-2">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row border ml-1 mr-1 px-2 rounded">
                  <div className="col-sm-3">
                    <p className="card-text text-justify text-center font-weight-normal h4 mt-4 pt-2">
                      {first_name} {last_name}
                    </p>
                  </div>
                  <div className="col-sm">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-info "
                            />
                            <b> Email</b> :- {email}
                          </td>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faMobileAlt}
                              className="text-info "
                            />
                            <b> Mobile</b> :- {mobile}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faLandmark}
                              className="text-info"
                            />
                            <b> Loan Type </b> :- {loan_type}
                          </td>
                          <td className="text-left">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="text-info"
                            />
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
  };

  const handleSearch = async () => {
    switch (searchType) {
      case "ID":
        tableData = tableData.filter((data) => data.user_id == searchData);
        if (tableData.length != 0) {
          setTableData(tableData);
        } else {
          setSearchStatus(false);
        }
        break;

      case "Name":
        try {
          const params = { search_type: searchType, search_key: searchData };
          const res = await axios.get("/filterSearch/", { params: params });
          console.log(res.data);
          if (res.data.data != "null") {
            setTableData(res.data.data);
          } else {
            setSearchStatus(false);
          }
        } catch (err) {
          console.log(err);
        }
        break;

      case "Loan Amount":
        switch (comparator) {
          case "<":
            tableData = tableData.filter(
              (data) => Number(data.total_loan) < Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;

          case ">":
            tableData = tableData.filter(
              (data) => Number(data.total_loan) > Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;
          case "=":
            tableData = tableData.filter(
              (data) => Number(data.total_loan) == Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;
        }

      case "Loan Paid":
        switch (comparator) {
          case "<":
            tableData = tableData.filter(
              (data) => Number(data.paid_loan) < Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;

          case ">":
            tableData = tableData.filter(
              (data) => Number(data.paid_loan) > Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;
          case "=":
            tableData = tableData.filter(
              (data) => Number(data.paid_loan) == Number(searchData)
            );
            if (tableData.length != 0) {
              setTableData(tableData);
            } else {
              setSearchStatus(false);
            }
            break;
        }
    }
  };

  const handleSearchClear = () => {
    setTableData(userList);
    setSearchStatus(true);
  };

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
                {/* <div class="container"> */}
                <div className="form-inline">
                  <div className="form-group">
                    <select
                      onChange={(e) => setSearchType(e.target.value)}
                      className="form-control w-100"
                      id="sel1"
                      name="search_type"
                    >
                      <option defaultValue>Search By</option>
                      <option>ID</option>
                      <option>Name</option>
                      <option>Loan Amount</option>
                      <option>Loan Paid</option>
                      <option>Loan Remaining</option>
                      <option>Tenure</option>
                      <option>Tenure remaining</option>
                      <option>Tenure completed</option>
                    </select>
                  </div>
                  {searchType === "Name" ||
                  searchType === "ID" ||
                  searchType === null ? null : (
                    <div className="form-group">
                      <select
                        onChange={(e) => setComparator(e.target.value)}
                        className="form-control w-100 mx-2"
                        id="sel1"
                        name="search_type"
                      >
                        <option defaultValue></option>
                        <option> &gt; </option>
                        <option> &lt; </option>
                        <option> = </option>
                      </select>
                    </div>
                  )}
                  <input
                    className="form-control mx-2 w-25"
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    name="search_key"
                    placeholder="Search"
                  />
                  <button
                    onClick={(e) => handleSearch(e)}
                    className="btn btn-success mx-2"
                    type="submit"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => handleSearchClear()}
                    className="btn btn-success mx-2"
                  >
                    Clear
                  </button>
                  <br />
                </div>
                {/* </div> */}
                <table className="table mt-2 shadow table-striped table-responsive-sm bg-light animate__animated animate__fadeIn">
                  <thead
                    className="text-left text-light"
                    style={{ backgroundColor: "#5161ce" }}
                  >
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
                    {searchStatus ? (
                      tableData.map(createTable)
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-info h5">
                          No Records found
                        </td>
                      </tr>
                    )}
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
    return <Spinner />;
  }
};

export default AdminDash;
