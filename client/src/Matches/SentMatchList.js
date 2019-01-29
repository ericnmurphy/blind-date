import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

export default class SentMatchList extends Component {
  state = {
    matches: {},
    message: "Loading . . ."
  };

  componentDidMount() {
    axios.get("/api/admin/matches/sent", {}).then(res => {
      if (res.data.length === 0) {
        this.setState({
          message: "No messages sent."
        });
      } else {
        this.setState({
          message: "Loaded.",
          matches: res.data
        });
      }
    });
  }

  handleToggle = e => {
    const matches = { ...this.state.matches };
    matches[e.currentTarget.id].toggle = !matches[e.currentTarget.id].toggle;
    this.setState({
      matches
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.message === "Loaded." ? (
          Object.keys(this.state.matches)
            .sort(function(a, b) {
              return a.sortDate - b.sortDate;
            })
            .map(key => (
              <div key={key} id={key} onClick={this.handleToggle}>
                <p className="sent">
                  Sent message to {this.state.matches[key].user1.name} (
                  {this.state.matches[key].user1.email}) and{" "}
                  {this.state.matches[key].user2.name} (
                  {this.state.matches[key].user2.email}) on{" "}
                  {moment(this.state.matches[key].sentDate).format(
                    "MMMM DD, YYYY"
                  )}
                  .{" "}
                  {this.state.matches[key].toggle ? (
                    <span className="sent-arrow">🡇</span>
                  ) : (
                    <span className="sent-arrow">🡆</span>
                  )}
                </p>
                {this.state.matches[key].toggle && (
                  <p>{this.state.matches[key].user1.message}</p>
                )}
                {this.state.matches[key].toggle && (
                  <p className="sent-footer">
                    {this.state.matches[key].user2.message}
                  </p>
                )}
              </div>
            ))
        ) : (
          <h3>{this.state.message}</h3>
        )}
      </React.Fragment>
    );
  }
}
