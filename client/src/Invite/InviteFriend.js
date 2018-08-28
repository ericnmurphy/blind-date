import React, { Component } from "react";
import axios from "axios";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";

export default class InviteFriend extends Component {
  state = {
    processing: false,
    message: ""
  };

  componentDidMount() {
    axios
      .get("/api/invite-friend", { params: { id: this.props.match.params.id } })
      .then(res => {
        console.log(res.data);
        this.setState({
          authenticated: true,
          grandparent: res.data[1]
        });
      })
      .catch(err => {
        this.setState({
          authenticated: false,
          errorMessage: err.response.data
        });
      });
  }

  setFormApi = formApi => {
    this.formApi = formApi;
  };

  handleSubmit = () => {
    const data = this.formApi.getState().values;
    data.ancestors = [this.state.grandparent, this.props.match.params.id];
    this.setState({ processing: true, message: "Sending..." });
    axios
      .post("/api/invite", data)
      .then(res => {
        this.setState({
          processing: false,
          message: `Thank you. We’ll be in touch with them directly.`
        });
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
      <React.Fragment>
        {this.state.authenticated === undefined && <h3>Loading...</h3>}
        {this.state.authenticated === false && (
          <h3>{this.state.errorMessage}</h3>
        )}
        {this.state.authenticated === true && (
          <Form
            className="invite-form"
            onSubmit={this.handleSubmit}
            getApi={this.setFormApi}
          >
            {({ formApi }) => (
              <React.Fragment>
                <div className="inline-field">
                  <label htmlFor="email">Enter your friend’s email.</label>
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
        )}
      </React.Fragment>
    );
  }
}
