import React, { Component } from "react";
import axios from "axios";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";

export default class Invite extends Component {
  state = {
    processing: false,
    message: ""
  };

  setFormApi = formApi => {
    this.formApi = formApi;
  };

  handleSubmit = () => {
    const data = this.formApi.getState().values;
    data.ancestors = ["1", "1"];
    this.setState({ processing: true, message: "Sending..." });
    axios
      .post("/api/invite", data)
      .then(res => {
        this.setState({ processing: false, message: `Sent to ${data.email}.` });
        this.formApi.reset();
      })
      .catch(err => {
        this.setState({
          processing: false,
          message: err.response.data
        });
        this.formApi.reset();
      });
  };

  render() {
    const validate = value => {
      return !isEmail(String(value)) ? "error" : null;
    };

    return (
      <Form onSubmit={this.handleSubmit} getApi={this.setFormApi}>
        {({ formApi }) => (
          <React.Fragment>
            <h3>Invite someone to set up their friend.</h3>
            <div className="field">
              <label htmlFor="email">Email</label>
              <Text
                field="email"
                className={formApi.getError("email")}
                id="email"
                validateOnBlur
                validate={validate}
                autoFocus
              />
            </div>
            <div className="button">
              <button disabled={this.state.processing} type="submit">
                Invite
              </button>
              <p>{this.state.message}</p>
            </div>
          </React.Fragment>
        )}
      </Form>
    );
  }
}
