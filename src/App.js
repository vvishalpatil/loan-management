import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import UserDash from "./Components/layout/Dashboard/UserDash";
import Footer from "./Components/layout/Footer";
import Navbar from "./Components/layout/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import AdminDash from "./Components/layout/Dashboard/AdminDash";
import LoanForm from "./Components/Details/LoanForm";
import Payment from "./Components/Details/Payment";
import Login from "./Components/auth/Login";
import ProtectedRouteAdmin from "./Components/auth/ProtectedRouteAdmin";
import ProtectedRouteUser from "./Components/auth/ProtectedRouteUser";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <React.Fragment>
            <div className="text-center">
              <Navbar />
              <ProtectedRouteUser exact path="/user" component={UserDash} />
              <ProtectedRouteAdmin exact path="/admin" component={AdminDash} />
              <ProtectedRouteUser exact path="/profile" component={Profile} />
              <ProtectedRouteUser exact path="/newloan" component={LoanForm} />
              <ProtectedRouteUser exact path="/payment" component={Payment} />
              <br />
              <Footer />
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
