import React, { Component } from "react";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import FourthStep from "./Steps/FourthStep";
import FifthStep from "./Steps/FifthStep";

export default class ReferralForm extends Component {
  state = { step: 0, values: { gender: null } };

  updateState = newValues => {
    this.setState({
      values: {
        ...this.state.values,
        ...newValues
      }
    });
  };

  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  setFormApi = formApi => {
    this.formApi = formApi;
  };

  renderStep(step, formState) {
    switch (step) {
      default:
        return <FirstStep nextStep={this.nextStep} />;
      case 1:
        return (
          <SecondStep nextStep={this.nextStep} updateState={this.updateState} />
        );
      case 2:
        return (
          <ThirdStep nextStep={this.nextStep} updateState={this.updateState} />
        );
      case 3:
        return (
          <FourthStep
            values={this.state.values}
            nextStep={this.nextStep}
            updateState={this.updateState}
            gender={this.state.values.gender}
          />
        );
      case 4:
        return <FifthStep />;
    }
  }

  render() {
    return <React.Fragment>{this.renderStep(this.state.step)}</React.Fragment>;
  }
}
