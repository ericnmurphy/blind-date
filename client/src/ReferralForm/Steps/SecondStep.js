import React, { Component } from "react";
import { Form, Text } from "informed";

export default class SecondStep extends Component {
  setFormApi = formApi => {
    this.formApi = formApi;
  };

  render() {
    const validate = value => {
      return !value ? "error" : null;
    };

    return (
      <Form
        onSubmit={() => {
          this.props.updateState(this.formApi.getState().values);
          this.props.nextStep();
        }}
        getApi={this.setFormApi}
      >
        {({ formApi }) => (
          <React.Fragment>
            <h3>First, tell us about you.</h3>
            <div className="field">
              <label htmlFor="first-name">First Name</label>
              <Text
                field="firstName"
                className={formApi.getError("firstName")}
                id="first-name"
                validateOnBlur
                validate={validate}
                autoFocus
              />
            </div>
            <div className="field">
              <label htmlFor="last-name">Last Name</label>
              <Text
                field="lastName"
                className={formApi.getError("lastName")}
                id="last-name"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field">
              <label htmlFor="profession">Profession</label>
              <Text
                field="profession"
                className={formApi.getError("profession")}
                id="profession"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <Text
                field="company"
                className={formApi.getError("company")}
                id="company"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field">
              <label htmlFor="link">Link</label>
              <Text
                field="website"
                className={formApi.getError("website")}
                id="link"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="button">
              <button type="submit">Next</button>
            </div>
          </React.Fragment>
        )}
      </Form>
    );
  }
}
