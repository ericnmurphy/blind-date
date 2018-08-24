import React, { Component } from "react";
import { Form, Text, RadioGroup, Radio } from "informed";
import axios from "axios";

export default class FourthStep extends Component {
  setFormApi = formApi => {
    this.formApi = formApi;
  };

  handleSubmit() {
    const {
      firstName,
      lastName,
      profession,
      company,
      website,
      gender,
      age,
      association,
      height,
      beard,
      adjective1,
      adjective2,
      adjective3,
      adjective4,
      adjective5,
      adjective6,
      bestQuality,
      haunt
    } = this.props.values;

    const socioObject = this.props.values.socioeconomic;
    const keys = Object.keys(socioObject);
    const socioeconomic = keys.filter(function(key) {
      return socioObject[key];
    });

    axios
      .post("/api/form", {
        firstName,
        lastName,
        profession,
        company,
        website,
        gender,
        age,
        socioeconomic,
        association,
        height,
        beard,
        adjective1,
        adjective2,
        adjective3,
        adjective4,
        adjective5,
        adjective6,
        bestQuality,
        haunt
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.nextStep();
      });
  }

  render() {
    const validate = value => {
      return !value ? "error" : null;
    };

    return (
      <Form
        onSubmit={() => {
          this.props.updateState(this.formApi.getState().values);
          this.handleSubmit();
        }}
        getApi={this.setFormApi}
      >
        {({ formApi }) => (
          <React.Fragment>
            <div>Fill in the blank</div>
            <div className="inline-field">
              <label htmlFor="association">I know my friend through</label>
              <Text
                field="association"
                className={formApi.getError("association")}
                id="association"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field-radio">
              <label>Choose one</label>
              <RadioGroup field="height" validateOnChange validate={validate}>
                <div className="radio">
                  <Radio
                    value="short"
                    className={formApi.getError("height")}
                    id="radio-short"
                  />
                  <label htmlFor="radio-short">Short</label>
                </div>
                <div className="radio">
                  <Radio
                    value="medium"
                    className={formApi.getError("height")}
                    id="radio-medium"
                  />
                  <label htmlFor="radio-medium">Medium</label>
                </div>
                <div className="radio">
                  <Radio
                    value="tall"
                    className={formApi.getError("height")}
                    id="radio-tall"
                  />
                  <label htmlFor="radio-tall">Tall</label>
                </div>
              </RadioGroup>
            </div>
            {this.props.gender === "male" ? (
              <div className="field-radio">
                <p>Choose one</p>
                <RadioGroup field="beard" validateOnChange validate={validate}>
                  <div className="radio">
                    <Radio
                      value="cleanShaven"
                      className={formApi.getError("beard")}
                      id="radio-clean-shaven"
                    />
                    <label htmlFor="radio-clean-shaven">Clean shaven</label>
                  </div>
                  <div className="radio">
                    <Radio
                      value="stubble"
                      className={formApi.getError("beard")}
                      id="radio-stubble"
                    />
                    <label htmlFor="radio-stubble">Stubble</label>
                  </div>
                  <div className="radio">
                    <Radio
                      value="mustache"
                      className={formApi.getError("beard")}
                      id="radio-mustache"
                    />
                    <label htmlFor="radio-mustache">Mustache</label>
                  </div>
                  <div className="radio">
                    <Radio
                      value="goatee"
                      className={formApi.getError("beard")}
                      id="radio-goatee"
                    />
                    <label htmlFor="radio-goatee">Goatee</label>
                  </div>
                  <div className="radio">
                    <Radio
                      value="bearded"
                      className={formApi.getError("beard")}
                      id="radio-bearded"
                    />
                    <label htmlFor="radio-bearded">Bearded</label>
                  </div>
                </RadioGroup>
              </div>
            ) : null}
            <div className="field-block">
              <label>
                6 adjectives that describe{" "}
                {this.props.gender === "male" ? "him" : "her"}
              </label>
              <div className="block">
                <Text
                  field="adjective1"
                  className={formApi.getError("adjective1")}
                  id="adjective-1"
                  validateOnBlur
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective2"
                  className={formApi.getError("adjective2")}
                  id="adjective-2"
                  validateOnBlur
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective3"
                  className={formApi.getError("adjective3")}
                  id="adjective-3"
                  validateOnBlur
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective4"
                  className={formApi.getError("adjective4")}
                  id="adjective-4"
                  validateOnBlur
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective5"
                  className={formApi.getError("adjective5")}
                  id="adjective-5"
                  validateOnBlur
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective6"
                  className={formApi.getError("adjective6")}
                  id="adjective-6"
                  validateOnBlur
                  validate={validate}
                />
              </div>
            </div>
            {this.props.gender === "male" ? null : (
              <div className="inline-field">
                <label htmlFor="best-quality">
                  Her best physical quality is
                </label>
                <Text
                  field="bestQuality"
                  className={formApi.getError("bestQuality")}
                  id="best-quality"
                  validateOnBlur
                  validate={validate}
                />
              </div>
            )}
            <div className="inline-field">
              <label htmlFor="haunt">
                You’re most likely to find{" "}
                {this.props.gender === "male" ? "him" : "her"}
              </label>
              <Text
                field="haunt"
                className={formApi.getError("haunt")}
                id="haunt"
                validateOnBlur
                validate={validate}
              />
            </div>
            <div className="field">
              <button type="submit">Submit</button>
            </div>
          </React.Fragment>
        )}
      </Form>
    );
  }
}
