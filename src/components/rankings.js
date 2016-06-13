import React, { Component } from "react";
import RankingsNav from "./rankingsNav";
import Players from "./players";

class Rankings extends Component {
  render() {
    return (
      <div>
        <RankingsNav />
        <Players type="rankings" />
      </div>
    );
  }
}

export default Rankings;
