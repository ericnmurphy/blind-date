import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import SentMatchList from "./Matches/SentMatchList";
import Users from "./Users/Users";
import Invite from "./Invite/Invite";
import InviteFriend from "./Invite/InviteFriend";
import Disable from "./Disable/Disable";
import "./App.css";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class Login extends Component {
  render() {
    return <div>LOGIN</div>;
  }
}

class Admin extends Component {
  render() {
    return (
      <div className="navigation">
        <ul>
          <li>
            <Link to="/admin/invite">Invite ></Link>
          </li>
          <li>
            <Link to="/admin/users">Users ></Link>
          </li>
          <li>
            <Link to="/admin/matches">Matches ></Link>
          </li>
          <li>
            <Link to="/admin/matches/sent">Sent Matches ></Link>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/:id" component={ReferralForm} />
        <Route exact path="/invite/:id" component={InviteFriend} />
        <Route exact path="/disable/:id" component={Disable} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/admin/invite" component={Invite} />
        <Route exact path="/admin/matches" component={MatchList} />
        <Route exact path="/admin/matches/sent" component={SentMatchList} />
        <Route exact path="/admin/users" component={Users} />
      </div>
    );
  }
}

export default App;
