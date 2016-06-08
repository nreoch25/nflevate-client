import React, { Component } from "react";
import Players from "./draft/players";

class Rankings extends Component {
  render() {
    return (
      <div>
        <div id="rankings_nav" className="btn-group btn-group-justified">
          <a href="#" className="active btn btn-default">All</a>
          <a href="#" className="btn btn-default">QB</a>
          <a href="#" className="btn btn-default">RB</a>
          <a href="#" className="btn btn-default">WR</a>
          <a href="#" className="btn btn-default">TE</a>
          <a href="#" className="btn btn-default">DEF</a>
          <a href="#" className="btn btn-default">PK</a>
        </div>
        <Players />
      </div>
    );
  }
}

export default Rankings;
