import React from 'react';
import { Component } from 'react';
import Header from "./header";
import { connect } from "react-redux";
import { storeDraftBoard } from "../actions/draft";

class App extends Component {
  componentDidMount() {
    window.addEventListener("beforeunload", this.handleUnLoad.bind(this));
  }
  handleUnLoad(evt) {
    this.props.storeDraftBoard();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, { storeDraftBoard })(App);
