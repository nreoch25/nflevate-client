import React, { Component } from "react";
import DraftBoard from "./draftBoard";
import RankingsNav from "./rankingsNav";
import Players from "./players";

class Draft extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <DraftBoard />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <RankingsNav />
            <Players type="draft" />
          </div>
          <div className="col-sm-6">
            <p>Chat here</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Draft;
