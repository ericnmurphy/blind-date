import React, { Component } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import SentMatchList from "./Matches/SentMatchList";
import Users from "./Users/Users";
import Invite from "./Invite/Invite";
import InviteFriend from "./Invite/InviteFriend";
import Disable from "./Disable/Disable";
import Login from "./Login/Login";
import "./App.css";

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
  },
  signout(cb) {
    this.isAuthenticated = false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      this.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Admin extends Component {
  render() {
    return (
      <div className="navigation">
        <ul>
          <li>
            <Link to="/a/invite">Invite ></Link>
          </li>
          <li>
            <Link to="/a/users">Users ></Link>
          </li>
          <li>
            <Link to="/a/matches">Matches ></Link>
          </li>
          <li>
            <Link to="/a/matches/sent">Sent Matches ></Link>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  state = { user: null, loggedIn: false };

  componentDidMount = () => {
    axios.get("/").then((req, res) => {
      console.log(req.session);
      console.log(req);
      console.log(res);
      if (res) {
        this.setState({ loggedIn: true });
      }
    });
  };

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <div className="container">
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />
          <Route path="/a" component={Admin} />
          <Route exact path="/:id" component={ReferralForm} />
        </Switch>
        <Route exact path="/invite/:id" component={InviteFriend} />
        <Route exact path="/disable/:id" component={Disable} />
        <PrivateRoute exact path="/a/invite" component={Invite} />
        <Route exact path="/a/matches" component={MatchList} />
        <Route exact path="/a/matches/sent" component={SentMatchList} />
        <Route exact path="/a/users" component={Users} />
      </div>
    );
  }
}

export default App;
