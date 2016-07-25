import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchPickPosition } from "../actions/draft";
import DraftRow from "./draftRow";

class DraftBoard extends Component {
  componentDidMount() {
    this.props.fetchPickPosition();
    //TODO check if draft in progress and redisplay list
    //loop through this.props.draft.draftedPicks
  }
  updateDraftBoard(cellNum) {
    let draftCell = document.getElementById(`cell${cellNum}`);
    let playerUpdate = this.props.draft.draftedPicks[cellNum - 1];
    draftCell.className = playerUpdate.pos;
    let cellMarkup = `<span>${playerUpdate.name}</span><br />`;
    cellMarkup += `<span>${playerUpdate.pos}</span>`;
    cellMarkup += `<span> ${playerUpdate.team}</span>`;
    cellMarkup += `<span> ${playerUpdate.bye}</span>`;
    draftCell.innerHTML = cellMarkup;
  }
  getPickPosition() {
    if(typeof this.props.draft.position.round !== "undefined") {
      if(typeof this.currentPick !== "undefined") {
        if(this.props.draft.position.overall > this.currentPick) {
          this.updateDraftBoard(this.props.draft.position.overall);
        }
      }
      this.currentPick = this.props.draft.position.overall;
      return `Round ${this.props.draft.position.round} - Pick ${this.props.draft.position.pick}`;
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
    let draftBoard = []
    for(var i = 1; i <= 17; i++) {
      draftBoard.push(
        <DraftRow key={i} round={i} />
      );
    }
    return draftBoard;
  }
  render() {
    let curPick = this.getPickPosition();
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
