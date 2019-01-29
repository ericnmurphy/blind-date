import React, { Component } from "react";
import axios from "axios";

export default class Disable extends Component {
  state = {
    processing: false,
    message: "Loading . . ."
  };

  componentDidMount() {
    axios
      .get("/api/exists", { params: { id: this.props.match.params.id } })
      .then(res => {
        axios
          .post("/api/disable", { id: this.props.match.params.id })
          .then(res => {
            console.log("reached");
            this.setState({
              message: "You won't recieve any more emails about your friend."
            });
          })
          .catch(err => {
            console.log("reached");
            this.setState({
              message: "Something went wrong. Please try again."
            });
          });
      })
      .catch(err => {
        this.setState({
          message: err.response.data
        });
      });
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}
