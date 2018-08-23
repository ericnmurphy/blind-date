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
            <div className="field-radio">
              <label>M or F?</label>
              <RadioGroup field="gender" validate={validate}>
                <div className="radio">
                  <Radio
                    value="male"
                    className={formApi.getError("gender")}
                    id="radio-male"
                  />
                  <label htmlFor="radio-male">M</label>
                </div>
                <div className="radio">
                  <Radio
                    value="female"
                    className={formApi.getError("gender")}
                    id="radio-female"
                  />
                  <label htmlFor="radio-female">F</label>
                </div>
              </RadioGroup>
            </div>
            <div className="field">
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
                <Checkbox field="lostSoul" id="lost-soul" />
                <label htmlFor="lost-soul">Lost Soul</label>
              </div>
              <div className="checkbox">
                <Checkbox field="starvingArtist" id="starving-artist" />
                <label htmlFor="starving-artist">Starving artist</label>
              </div>
              <div className="checkbox">
                <Checkbox
                  field="overeducatedAndUnderpaid"
                  id="overeducated-and-underpaid"
                />
                <label htmlFor="overeducated-and-underpaid">
                  Overeducated and Underpaid
                </label>
              </div>
              <div className="checkbox">
                <Checkbox field="devotedEmployee" id="devoted-employee" />
                <label htmlFor="devoted-employee">Devoted Employee</label>
              </div>
              <div className="checkbox">
                <Checkbox field="doctorLawyer" id="doctor-lawyer" />
                <label htmlFor="doctor-lawyer">
                  Doctor, Lawyer, Other Mom-Approved Professional
                </label>
              </div>
              <div className="checkbox">
                <Checkbox field="boss" id="boss" />
                <label htmlFor="boss">Boss</label>
              </div>
              <div className="checkbox">
                <Checkbox field="trustFunded" id="trust-funded" />
                <label htmlFor="trust-funded">Trust Funded</label>
              </div>
              <div className="checkbox">
                <Checkbox field="tycoon" id="tycoon" />
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
