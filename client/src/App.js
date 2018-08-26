import React, { Component } from "react";
import { Route } from "react-router-dom";
import ReferralForm from "./ReferralForm/ReferralForm";
import MatchList from "./Matches/MatchList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={ReferralForm} />
        <Route path="/admin/matches" component={MatchList} />
      </div>
    );
  }
}

export default App;
