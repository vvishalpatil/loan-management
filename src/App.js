import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserDash from "./Components/layout/Dashboard/UserDash";
import Footer from "./Components/layout/Footer";
import Navbar from "./Components/layout/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import AdminDash from "./Components/layout/Dashboard/AdminDash";
import LoanForm from "./Components/Details/LoanForm";
import Payment from "./Components/Details/Payment";
import Login from "./Components/auth/Login";
import ProtectedRoute from "./Components/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <React.Fragment>
            <div className="text-center">
              <Navbar />
              <ProtectedRoute exact path="/" component={UserDash} />
              <ProtectedRoute exact path="/admin" component={AdminDash} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute exact path="/newloan" component={LoanForm} />
              <ProtectedRoute exact path="/payment" component={Payment} />
              <br />
              <Footer />
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
