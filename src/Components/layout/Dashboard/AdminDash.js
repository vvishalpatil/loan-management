import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import AdminChart from "../../AdminChart";
import LoanChart from "../../LoanChart";
import TenureChart from "../../TenureChart";
import CurrencyFormat from "react-currency-format";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEnvelope,
  faLandmark,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import TransactioStatusChart from "../../TransactionStatusChart";

const AdminDash = () => {
  const [loanType, setLoanType] = useState(null);
  const [loanOptions, setLoanOptions] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loanChart, setLoanChart] = useState(null);

  useEffect(() => {
    const getLoanOptions = async () => {
      try {
        const res = await axios.get("/getAppliedLoanOptions");
        setLoanOptions(res.data.options);
        setLoanChart(res.data.loan_summary);
        setLoanType(res.data.options[0]);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getLoanOptions();
  }, []);

  const [userList, setUserList] = useState(null);

  const [status, setStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchType, setSearchType] = useState("Search By");
  const [searchData, setSearchData] = useState(null);
  const [searchData1, setSearchData1] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [searchStatus, setSearchStatus] = useState(true);
  const [comparator, setComparator] = useState("=");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        if (loanType) {
          const res = await axios.get("/getUsers/", {
            params: { loantype: loanType },
          });
          setUserList(res.data.users);
          setTableData(res.data.users);
          setStatus(true);
        }
      } catch (err) {
        console.log("AdminDash", err);
      }
    };
    getAllUsers();
  }, [loanType]);

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
            <CurrencyFormat
              value={parseInt(remaining_loan) + parseInt(paid_loan)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
            />
          </td>
          <td className="text-justify">
            {" "}
            <CurrencyFormat
              value={paid_loan}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
            />
          </td>
          <td className="text-justify">
            <CurrencyFormat
              value={remaining_loan}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
            />
          </td>

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
        loan_id,
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
        <div
          key={loan_id}
          className="modal animate__animated animate__fadeIn"
          id="user"
        >
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
    try {
      const params = {
        search_type: searchType,
        search_key: searchData,
        comparator: comparator,
        search_key1: searchData1,
        loantype: loanType,
      };
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
  };

  const handleSearchClear = () => {
    setTableData(userList);
    setSearchStatus(true);
    setSearchType("Search By");
    setSearchData("");
  };

  const handleOnChange = (e) => {
    setSearchData(e.target.value);
    console.log(e);
  };

  if (loaded) {
    return (
      <div>
        <div className="container-fluid mt-4">
          <div className="row mt-2 ">
            <div className="col-sm-3 mb-2">

              <ul class="nav nav-tabs " role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="pill" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="pill" href="#menu1">Menu 1</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="pill" href="#menu2">Menu 2</a>
                </li>
              </ul>
              <div class="tab-content">
                <div id="home" class=" tab-pane active"><br />
                  <AdminChart loan={loanChart} />
                </div>
                <div id="menu1" class=" tab-pane fade"><br />
                  <TransactioStatusChart ></TransactioStatusChart>    </div>
                <div id="menu2" class=" tab-pane fade"><br />
                  <h3>Menu 2</h3>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-9 mb-2">
              <div className="row container-fluid">
                <div className="col-sm-4">
                  <div className="form-group">
                    <select
                      className="form-control shadow-sm"
                      onChange={(e) => {
                        setLoanType(e.target.value);
                      }}
                      name="loanType"
                    >
                      {loanOptions
                        ? loanOptions.map((option, index) => (
                          <option
                            className="h6 text-success"
                            key={index}
                            value={option}
                          >
                            {option}
                          </option>
                        ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="col-sm-8"></div>
              </div>
              {status ? (
                <div className="container-fluid mt-3">
                  {/* <div class="container"> */}
                  <div className="form-inline">
                    <div className="form-group">
                      <select
                        onChange={(e) => setSearchType(e.target.value)}
                        className="form-control w-100"
                        id="sel1"
                        value={searchType}
                        name="search_type"
                      >
                        <option>Search By</option>
                        <option>User Id</option>
                        <option>Name</option>
                        <option>Date Issued</option>
                        <option>Date Issued (Range)</option>
                        <option>Loan Amount</option>
                        <option>Loan Paid</option>
                        <option>Loan Remaining</option>
                        <option>Tenure</option>
                        <option>Tenure remaining</option>
                        <option>Tenure completed</option>
                      </select>
                    </div>
                    {searchType === "Name" ||
                      searchType === "Search By" ||
                      searchType === "User Id" ||
                      searchType == "Date Issued (Range)" ||
                      searchType === null ? null : (
                        <div className="form-group">
                          <select
                            onChange={(e) => setComparator(e.target.value)}
                            className="form-control w-100 mx-2"
                            id="sel1"
                            name="search_type"
                          >
                            <option defaultValue> = </option>
                            <option> &gt; </option>
                            <option> &lt; </option>
                          </select>
                        </div>
                      )}
                    {searchType == "Date Issued (Range)" ? (
                      <React.Fragment>
                        <label className="pl-3">From</label>
                        <input
                          className="form-control mx-2 w-25"
                          onChange={(e) => setSearchData(e.target.value)}
                          type="date"
                          name="search_key"
                          placeholder="Search"
                        />
                        <label>To</label>
                        <input
                          className="form-control mx-2 w-25"
                          onChange={(e) => setSearchData1(e.target.value)}
                          type="date"
                          name="search_key"
                          placeholder="Search"
                        />
                      </React.Fragment>
                    ) : (
                        <input
                          className="form-control mx-2 w-25"
                          onChange={(e) => setSearchData(e.target.value)}
                          type={searchType == "Date Issued" ? "date" : "text"}
                          name="search_key"
                          value={searchData}
                          placeholder="Search"
                        />
                      )}

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
                  <table className="table mt-3 shadow table-striped table-responsive-sm bg-light animate__animated animate__fadeIn">
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
              ) : null}
            </div>
          </div>
        </div>
        {displayModal()}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default AdminDash;
