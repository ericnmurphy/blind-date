import React, { Component } from "react";
import { Form, Text, RadioGroup, Radio, Checkbox } from "informed";

export default class ThirdStep extends Component {
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
            <h3>Now tell us about your friend.</h3>
            <div className="short-radio">
              <label>M or F?</label>
              <RadioGroup field="gender" validate={validate}>
                <div className="radio">
                  <Radio
                    field="gender"
                    value="male"
                    className={formApi.getError("gender")}
                    id="radio-male"
                    autoFocus
                  />
                  <label htmlFor="radio-male">M</label>
                </div>
                <div className="radio">
                  <Radio
                    field="gender"
                    value="female"
                    className={formApi.getError("gender")}
                    id="radio-female"
                  />
                  <label htmlFor="radio-female">F</label>
                </div>
              </RadioGroup>
            </div>
            <div className="short-field">
              <label htmlFor="age">Age</label>
              <Text
                type="number"
                className={formApi.getError("age")}
                field="age"
                id="age"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field-checkbox">
              <label>Click all that apply</label>

              <div className="checkbox">
                <Checkbox field="socioeconomic.Lost Soul" id="lost-soul" />
                <label htmlFor="lost-soul">Lost Soul</label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="socioeconomic.Starving Artist"
                  id="starving-artist"
                />
                <label htmlFor="starving-artist">Starving Artist</label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="socioeconomic.Overeducated and Underpaid"
                  id="overeducated-and-underpaid"
                />
                <label htmlFor="overeducated-and-underpaid">
                  Overeducated and Underpaid
                </label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="socioeconomic.Devoted Employee"
                  id="devoted-employee"
                />
                <label htmlFor="devoted-employee">Devoted Employee</label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="socioeconomic.Doctor, Lawyer, Other Mom-Approved Professional"
                  id="doctor-lawyer"
                />
                <label htmlFor="doctor-lawyer">
                  Doctor, Lawyer, Other Mom-Approved Professional
                </label>
              </div>
              <div className="checkbox">
                <Checkbox field="socioeconomic.Boss" id="boss" />
                <label htmlFor="boss">Boss</label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="socioeconomic.Trust Funded"
                  id="trust-funded"
                />
                <label htmlFor="trust-funded">Trust Funded</label>
              </div>
              <div className="checkbox">
                <Checkbox field="socioeconomic.Tycoon" id="tycoon" />
                <label htmlFor="tycoon">Tycoon</label>
              </div>
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
