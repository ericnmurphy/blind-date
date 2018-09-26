import React, { Component } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";
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

class Login extends Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: "/admin" }
    };

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>Please log in.</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
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
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
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
