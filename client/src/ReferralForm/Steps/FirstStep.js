import React, { Component } from "react";

export default class FirstStep extends Component {
  render() {
    return (
      <React.Fragment>
        <h3>
          If you reached this page, you have a friend to set up.
          <br />
          <button type="button" onClick={this.props.nextStep}>
            Click here.
          </button>
        </h3>
      </React.Fragment>
    );
  }
}
