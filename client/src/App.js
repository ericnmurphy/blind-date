import React, { Component } from "react";
import { Route } from "react-router-dom";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import Users from "./Users/Users";
import Invite from "./Invite/Invite";
import InviteFriend from "./Invite/InviteFriend";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/:id" component={ReferralForm} />
        <Route exact path="/admin/invite" component={Invite} />
        <Route exact path="/invite/:id" component={InviteFriend} />
        <Route path="/admin/matches" component={MatchList} />
        <Route path="/admin/users" component={Users} />
      </div>
    );
  }
}

export default App;
