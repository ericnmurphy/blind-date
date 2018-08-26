import React, { Component } from "react";
import axios from "axios";

export default class MatchList extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    axios.get("/api/matches", {}).then(res => {
      this.setState({
        matches: res.data
      });
    });
  }

  render() {
    return this.state.matches.map((match, i) => (
      <div key={i}>
        <p>
          Match for {match.user1.name} ({match.user1.email}) and{" "}
          {match.user2.name} ({match.user1.email}
          ). ♥
        </p>
        <div className="match-textareas">
          <textarea defaultValue={match.user1.message} />
          <textarea defaultValue={match.user2.message} />
        </div>
        <button
          type="button"
          onClick={() => {
            axios.post("/api/send", { match }).then(res => {
              console.log(res);
              console.log(res.data);
            });
          }}
        >
          Send
        </button>
      </div>
    ));
  }
}
