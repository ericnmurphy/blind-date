import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Text } from "informed";
import axios from "axios";

export default class Login extends Component {
  setFormApi = formApi => {
    this.formApi = formApi;
    //validate via server
  };

  handleSubmit = e => {
    axios
      .post("/api/login", {
        username: "sL7MNPUa9rSUXcyWQpqEnwYB",
        password: this.formApi.getState().values.password
        // "u%WMkyC*rKVS5PJ7Y3gFMD$w"
      })
      .then(res => {
        axios.get("/api/login/check").then(res => {
          this.props.setUser(res.data._id);
          this.props.history.push("/a");
        });
      })
      .catch(err => {
        console.log(`sign up error: ${err}`);
      });
  };

  render() {
    const validate = value => {
      return !value ? "error" : null;
    };

    return (
      <Form onSubmit={this.handleSubmit} getApi={this.setFormApi}>
        {({ formApi }) => (
          <React.Fragment>
            <h3>Do you have a password?</h3>
            <div className="field">
              <Text
                type="password"
                field="password"
                className={formApi.getError("password")}
                id="password"
                validateOnBlur
                validate={validate}
                autoFocus
              />
            </div>
            <div className="button">
              <button type="submit">Login</button>
            </div>
          </React.Fragment>
        )}
      </Form>
    );
  }
}
