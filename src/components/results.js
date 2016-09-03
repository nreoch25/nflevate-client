import React, { Component } from "react";
import { connect } from "react-redux";
import { getCompletedDrafts } from "../actions/draft";

class Results extends Component {
  componentDidMount() {
    this.props.getCompletedDrafts();
  }
  render() {
    return (
      <div>
        <h1>Draft Results</h1>
      </div>
    );
  }
}

export default connect(null, { getCompletedDrafts })(Results);
