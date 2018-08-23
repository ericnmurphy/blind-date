import React, { Component } from "react";
import { Form, Text, RadioGroup, Radio, Checkbox } from "informed";

export default class FourthStep extends Component {
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
            <div>Fill in the blank</div>
            <div className="inline-field">
              <label htmlFor="association">I know my friend through</label>
              <Text
                field="association"
                className={formApi.getError("association")}
                id="association"
                validate={validate}
              />
            </div>
            <div className="field-radio">
              <label>Choose one</label>
              <RadioGroup field="height" validate={validate}>
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
              <div className="field">
                <p>Choose one</p>
                <RadioGroup field="beard" validate={validate}>
                  <div className="field">
                    <Radio
                      value="cleanShaven"
                      className={formApi.getError("beard")}
                      id="radio-clean-shaven"
                    />
                    <label htmlFor="radio-clean-shaven">Clean shaven</label>
                  </div>
                  <div className="field">
                    <Radio
                      value="stubble"
                      className={formApi.getError("beard")}
                      id="radio-stubble"
                    />
                    <label htmlFor="radio-stubble">Stubble</label>
                  </div>
                  <div className="field">
                    <Radio
                      value="mustache"
                      className={formApi.getError("beard")}
                      id="radio-mustache"
                    />
                    <label htmlFor="radio-mustache">Mustache</label>
                  </div>
                  <div className="field">
                    <Radio
                      value="goatee"
                      className={formApi.getError("beard")}
                      id="radio-goatee"
                    />
                    <label htmlFor="radio-goatee">Goatee</label>
                  </div>
                  <div className="field">
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
                  field="adjective-1"
                  className={formApi.getError("adjective-1")}
                  id="adjective-1"
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective-2"
                  className={formApi.getError("adjective-2")}
                  id="adjective-2"
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective-3"
                  className={formApi.getError("adjective-3")}
                  id="adjective-3"
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective-4"
                  className={formApi.getError("adjective-4")}
                  id="adjective-4"
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective-5"
                  className={formApi.getError("adjective-5")}
                  id="adjective-5"
                  validate={validate}
                />
              </div>
              <div className="block">
                <Text
                  field="adjective-6"
                  className={formApi.getError("adjective-6")}
                  id="adjective-6"
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
