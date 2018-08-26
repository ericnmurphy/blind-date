import React, { Component } from "react";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import FourthStep from "./Steps/FourthStep";
import FifthStep from "./Steps/FifthStep";
import axios from "axios";

export default class ReferralForm extends Component {
  state = {
    step: 0,
    values: { gender: null }
  };

  componentDidMount() {
    axios
      .get("/api/email", { params: { id: this.props.match.params.id } })
      .then(res => {
        console.log(res.data);
        this.setState({
          authenticated: true,
          values: { email: res.data.email }
        });
      })
      .catch(err => {
        this.setState({
          authenticated: false,
          errorMessage: err.response.data
        });
      });
  }

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
    return (
      <React.Fragment>
        {this.state.authenticated === undefined && <h3>Loading...</h3>}
        {this.state.authenticated === true && this.renderStep(this.state.step)}
        {this.state.authenticated === false && (
          <h3>{this.state.errorMessage}</h3>
        )}
      </React.Fragment>
    );
  }
}
