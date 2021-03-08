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

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <React.Fragment>
            <div className="text-center">
              <Navbar />
              <Route exact path="/" component={UserDash} />
              <Route exact path="/admin" component={AdminDash} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/newloan" component={LoanForm} />
              <Route exact path="/payment" component={Payment} />
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
