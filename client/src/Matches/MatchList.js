import React, { Component } from "react";
import axios from "axios";

export default class MatchList extends Component {
  state = {
    matches: [],
    message: "Loading . . ."
  };

  componentDidMount() {
    axios.get("/api/matches", {}).then(res => {
      if (res.data.length === 0) {
        this.setState({
          message: "No matches have been made."
        });
      } else {
        this.setState({
          message: "Loaded.",
          matches: res.data
        });
      }
    });
  }

  handleChange = (i, e) => {
    const matches = this.state.matches;
    const key = e.target.getAttribute("data-key");
    matches[i][key].message = e.target.value;
    this.setState({
      matches
    });
  };

  handleSave = (i, e) => {
    const matches = this.state.matches;
    matches[i].status = "Saving...";
    this.setState({
      matches
    });
    const id = this.state.matches[i]._id;
    const message1 = this.state.matches[i].user1.message;
    const message2 = this.state.matches[i].user2.message;
    axios
      .post("/api/admin/matches/save", { id, message1, message2 })
      .then(res => {
        matches[i].status = "Save";
        this.setState({
          matches
        });
      });
  };

  handleDelete = (i, e) => {
    const matches = this.state.matches;
    if (this.state.matches[i].delete === "Really delete match?") {
      const id = this.state.matches[i]._id;
      axios.delete("/api/admin/matches/delete", { data: { id } }).then(res => {
        matches[i].delete = "Deleted.";
        this.setState({
          matches
        });
      });
    } else {
      matches[i].delete = "Really delete match?";
      this.setState({
        matches
      });
    }
  };

  handleSend = (i, e) => {
    const matches = this.state.matches;
    matches[i].sending = "Sending...";
    this.setState({
      matches
    });
    const id = this.state.matches[i]._id;
    const message1 = this.state.matches[i].user1.message;
    const message2 = this.state.matches[i].user2.message;
    axios
      .post("/api/admin/matches/save", { id, message1, message2 })
      .then(res => {
        const match = this.state.matches[i];
        axios.post("/api/send", { match }).then(res => {
          console.log(res);
          console.log(res.data);
          matches[i].sending = "Sent.";
          this.setState({
            matches
          });
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.message === "Loaded.") === true ? (
          this.state.matches.map((match, i) => (
            <div key={i} id={i}>
              {this.state.matches[i].delete === "Deleted." ? (
                <p>{this.state.matches[i].delete}</p>
              ) : this.state.matches[i].sending === "Sent." ? (
                <p>{this.state.matches[i].sending}</p>
              ) : (
                <React.Fragment>
                  <p>
                    Match for {match.user1.name} ({match.user1.email}) and{" "}
                    {match.user2.name} ({match.user2.email}
                    ). ♥
                  </p>
                  <div className="match-textareas">
                    <textarea
                      data-key="user1"
                      onChange={e => this.handleChange(i, e)}
                      defaultValue={match.user1.message}
                    />
                    <textarea
                      data-key="user2"
                      onChange={e => this.handleChange(i, e)}
                      defaultValue={match.user2.message}
                    />
                  </div>
                  <div className="match-buttons">
                    <button
                      type="button"
                      className="delete"
                      disabled={
                        this.state.matches[i].status === "Saving..." ||
                        this.state.matches[i].sending === "Sending..."
                      }
                      onClick={e => this.handleDelete(i, e)}
                    >
                      {this.state.matches[i].delete === "Really delete match?"
                        ? this.state.matches[i].delete
                        : "Delete"}
                    </button>
                    <button
                      type="button"
                      disabled={
                        this.state.matches[i].status === "Saving..." ||
                        this.state.matches[i].sending === "Sending..."
                      }
                      onClick={e => this.handleSave(i, e)}
                    >
                      {this.state.matches[i].status === "Saving..."
                        ? this.state.matches[i].status
                        : "Save"}
                    </button>
                    <button
                      type="button"
                      disabled={
                        this.state.matches[i].status === "Saving..." ||
                        this.state.matches[i].sending === "Sending..."
                      }
                      onClick={e => this.handleSend(i, e)}
                    >
                      {this.state.matches[i].sending === "Sending..."
                        ? this.state.matches[i].sending
                        : "Save and Send"}
                    </button>
                  </div>
                </React.Fragment>
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
