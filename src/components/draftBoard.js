import React, { Component } from "react";
import localforage from "localforage";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchPickPosition, updateFromStorage, persistCompletedDraft } from "../actions/draft";
import DraftRow from "./draftRow";

class DraftBoard extends Component {
  componentDidMount() {
    this.props.fetchPickPosition();
    if(typeof this.props.draft.draftedPicks !== "undefined") {
      if(this.props.draft.draftedPicks.length > 0) {
        this.displayDraftRows();
        this.props.draft.draftedPicks.map((pick, index) => {
          let cellNum = index + 1;
          this.updateDraftBoard(cellNum);
        });
      } else {
        localforage.getItem("nflevate_draftBoard", (err, response) => {
          if(response) {
            let storageItems = JSON.parse(response);
            if(storageItems.length > 0) {
              localforage.getItem("nflevate_position", (err, response) => {
                let position = JSON.parse(response);
                this.props.updateFromStorage(storageItems, position, this);
              });
            }
          }
        });
      }
    }
  }
  updateFromStorage() {
    console.log(this.props.draft);
    if(typeof this.props.draft.draftedPicks !== "undefined") {
      if(this.props.draft.draftedPicks.length > 0) {
        this.displayDraftRows();
        this.props.draft.draftedPicks.map((pick, index) => {
          let cellNum = index + 1;
          this.updateDraftBoard(cellNum);
        });
      }
    }
  }
  displayDraftRows() {
    let draftRound = this.props.draft.position.round;
    if(draftRound === 1) { return; }
    for(var i = 1; i <= draftRound; i++) {
      //increment draftboard round
      document.getElementById(`rd${i}`).style.display = "table-row";
      document.getElementById(`head${i}`).style.display = "table-cell";
      let rowCells = document.querySelectorAll(`tr#rd${i} td`);
      rowCells.forEach((cell) => {
        cell.style.display = "table-cell";
      });
    }
  }
  updateDraftBoard(cellNum) {
    let draftCell = document.getElementById(`cell${cellNum}`);
    draftCell.style.display = "table-cell";
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
      if(this.currentPick === 5) {
        this.props.persistCompletedDraft();
      }
      return `Round ${this.props.draft.position.round} - Pick ${this.props.draft.position.pick}`;
    }
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

export default connect(mapStateToProps, { fetchPickPosition, updateFromStorage, persistCompletedDraft })(DraftBoard);
