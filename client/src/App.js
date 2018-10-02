import React, { Component } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import SentMatchList from "./Matches/SentMatchList";
import Users from "./Users/Users";
import Invite from "./Invite/Invite";
import InviteFriend from "./Invite/InviteFriend";
import Disable from "./Disable/Disable";
import Login from "./Login/Login";
import "./App.css";

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
    const persistUser = localStorage.getItem("userLoggedIn");
    persistUser && this.setState({ user: JSON.parse(persistUser) });
  };

  setUser = user => {
    this.setState({ user });
    localStorage.setItem("userLoggedIn", JSON.stringify(user));
  };

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.user ? (
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
    return (
      <div className="container">
        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              this.state.user ? (
                <Redirect to={{ pathname: "/a" }} />
              ) : (
                <Login {...props} setUser={this.setUser} />
              )
            }
          />
          <PrivateRoute path="/a" component={Admin} />
          <Route exact path="/:id" component={ReferralForm} />
        </Switch>
        <Route exact path="/invite/:id" component={InviteFriend} />
        <Route exact path="/disable/:id" component={Disable} />
        <PrivateRoute exact path="/a/invite" component={Invite} />
        <PrivateRoute exact path="/a/matches" component={MatchList} />
        <PrivateRoute exact path="/a/matches/sent" component={SentMatchList} />
        <PrivateRoute exact path="/a/users" component={Users} />
      </div>
    );
  }
}

export default App;
