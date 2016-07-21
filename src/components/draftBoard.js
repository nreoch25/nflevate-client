import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPickPosition } from "../actions/draft";

class DraftBoard extends Component {
  componentDidMount() {
    this.props.fetchPickPosition();
  }
  getPickPosition() {
    if(typeof this.props.draft.position.round !== "undefined") {
      return `Round ${this.props.draft.position.round} - Pick ${this.props.draft.position.pick}`;
    }
  }
  getIndex(rd) {
    switch(rd) {
      case 1:
        return { start: 0, finish: 10 };
      case 2:
        return { start: 10, finish: 20 };
      case 3:
        return { start: 20, finish: 30 };
      case 4:
        return { start: 30, finish: 40 };
      case 5:
        return { start: 40, finish: 50 };
      case 6:
        return { start: 50, finish: 60 };
      case 7:
        return { start: 60, finish: 70 };
      case 8:
        return { start: 70, finish: 80 };
      case 9:
        return { start: 80, finish: 90 };
      case 10:
        return { start: 90, finish: 100 };
      case 11:
        return { start: 100, finish: 110 };
      case 12:
        return { start: 110, finish: 120 };
      case 13:
        return { start: 120, finish: 130 };
      case 14:
        return { start: 130, finish: 140 };
      case 15:
        return { start: 140, finish: 150 };
      case 16:
        return { start: 150, finish: 160 };
      case 17:
        return { start: 160, finish: 170 };
      default:
        break;
    }
  }
  getDraftedPicks(currentRound) {
    if(typeof this.props.draft.draftedPicks === "undefined" || this.props.draft.draftedPicks.length === 0) {return};
    let draftPicks = this.props.draft.draftedPicks;
    let draftedPicks = [];
    let pickIndex = this.getIndex(currentRound);
    for(var i = pickIndex.start; i < pickIndex.finish; i++ ) {
      if(typeof draftPicks[i] === "undefined") { break; }
      draftedPicks.push(
        <td key={i} className={draftPicks[i].pos}>
          <span>{draftPicks[i].name}</span>
          <br />
          <span>{draftPicks[i].pos}</span>
          <span> ({draftPicks[i].team})</span>
          <span> {draftPicks[i].bye}</span>
        </td>
      );
    }
    return draftedPicks;
  }
  getDraftBoard() {
    if(typeof this.props.draft.draftedPicks !== "undefined") {
      let currentRound = this.props.draft.position.round;
      let currentPick = this.props.draft.position.pick;
      let draftRounds = [];
      // TODO display reverse table for round 2
      for(var i = 1; i <= currentRound; i++) {
        let classNM = (i % 2 == 0) ? "evenRow" : "oddRow";
        draftRounds.push(
          <tr key={i} id={`rd${i}`} className={classNM}>
            <th>{i}</th>
              { this.getDraftedPicks(i) }
          </tr>
        );
      }
      return draftRounds;
    }
  }
  render() {
    let curPick = this.getPickPosition()
    return(
      <div>
        <div className="well well-sm"><strong>{curPick}</strong></div>
        <table id="draftboard" className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
          </thead>
          <tbody>
            { this.getDraftBoard() }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { draft: state.draft }
}

export default connect(mapStateToProps, { fetchPickPosition })(DraftBoard);
