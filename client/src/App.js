import React, { Component } from "react";
import { Route } from "react-router-dom";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import SentMatchList from "./Matches/SentMatchList";
import Users from "./Users/Users";
import Invite from "./Invite/Invite";
import InviteFriend from "./Invite/InviteFriend";
import Disable from "./Disable/Disable";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/:id" component={ReferralForm} />
        <Route exact path="/admin/invite" component={Invite} />
        <Route exact path="/invite/:id" component={InviteFriend} />
        <Route exact path="/disable/:id" component={Disable} />
        <Route exact path="/admin/matches" component={MatchList} />
        <Route exact path="/admin/matches/sent" component={SentMatchList} />
        <Route exact path="/admin/users" component={Users} />
      </div>
    );
  }
}

export default App;
