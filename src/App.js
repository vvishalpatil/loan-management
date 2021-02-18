import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserDash from './Components/layout/Dashboard/UserDash';
import Footer from './Components/layout/Footer';
import Navbar from './Components/layout/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import AdminDash from './Components/layout/Dashboard/AdminDash';
import LoanForm from './Components/LoanForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={UserDash} />
          <Route exact path="/admin" component={AdminDash}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/newloan" component={LoanForm}/>
        </Switch>
        <br/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
