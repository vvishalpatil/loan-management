import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserDash from './Components/layout/Dashboard/UserDash';
import Footer from './Components/layout/Footer';
import Navbar from './Components/layout/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import AdminDash from './Components/layout/Dashboard/AdminDash';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={UserDash} />
          <Route exact path="/admin" component={AdminDash}/>
          <Route exact path="/profile" component={Profile}/>
        </Switch>
        <br/>
        <Footer/>
      </div>
     
    </Router>
  );
}

export default App;
