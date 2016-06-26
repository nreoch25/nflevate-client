import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPickPosition, fetchDraftedPicks } from "../actions/draft";

class DraftBoard extends Component {
  componentDidMount() {
    this.props.fetchPickPosition();
    this.props.fetchDraftedPicks();
  }
  getPickPosition() {
    if(typeof this.props.draft.position.round !== "undefined") {
      return `Round ${this.props.draft.position.round} - Pick ${this.props.draft.position.pick}`;
    }
  }
  getDraftedPicks() {
    let draftedPicks = [];
    this.props.draft.draftedPicks.map((pick, index) => {
      draftedPicks.push(
        <td key={index} className={pick.pos}>
          <span>{pick.name}</span>
          <br />
          <span>{pick.pos}</span>
          <span> ({pick.team})</span>
          <span> {pick.bye}</span>
        </td>
      );
    });
    return draftedPicks;
  }
  getDraftBoard() {
    if(typeof this.props.draft.draftedPicks !== "undefined") {
      let currentRound = this.props.draft.position.round;
      let currentPick = this.props.draft.position.pick;
      if(currentRound === 1 && currentPick === 1) {
        return (
          <tr id={`rd${currentRound}`}>
            <th>1</th>
              { this.getDraftedPicks() }
          </tr>
        )
      }
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

export default connect(mapStateToProps, { fetchPickPosition, fetchDraftedPicks })(DraftBoard);
