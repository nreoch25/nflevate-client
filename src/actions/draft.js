import axios from "axios";
import localforage from "localforage";
import config from "../../config";
import { FETCH_PICK_POSITION, FETCH_DRAFTED_PICKS } from "./types";
const API_URL = config.API_URL;
let pickPosition = { round: 1, pick: 1, overall: 0 };
let draftedPlayers = [];
const picksPerRound = 10;

function fetchDraftedPicks() {
  return (dispatch) => {
    dispatch({
      type: FETCH_DRAFTED_PICKS,
      payload: draftedPlayers
    });
  }
}

export function updateFromStorage(picks, position, draftBoard) {
  return(dispatch) => {
    dispatch({type: FETCH_DRAFTED_PICKS, payload: picks});
    dispatch({type: FETCH_PICK_POSITION, payload: position});
    draftBoard.updateFromStorage();
  }
}

export function storeDraftBoard() {
  return (dispatch) => {
    localforage.setItem("nflevate_draftBoard", JSON.stringify(draftedPlayers));
    localforage.setItem("nflevate_position", JSON.stringify(pickPosition));
  }
}

export function fetchPickPosition() {
  return (dispatch) => {
    dispatch({
      type: FETCH_PICK_POSITION,
      payload: pickPosition
    })
  }
}

export function draftPick(pick) {
  draftedPlayers.push(pick);
  return (dispatch) => {
    dispatch(fetchDraftedPicks());
  }
}

export function updatePickPosition() {
  return(dispatch) => {
    if(pickPosition.pick % picksPerRound === 0) {
      console.log("Increment Round");
      pickPosition.overall++;
      pickPosition.round++;
      pickPosition.pick = 1;
      //increment draftboard round
      document.getElementById(`rd${pickPosition.round}`).style.display = "table-row";
      document.getElementById(`head${pickPosition.round}`).style.display = "table-cell";
      let rowCells = document.querySelectorAll(`tr#rd${pickPosition.round} td`);
      rowCells.forEach((cell) => {
        cell.style.display = "table-cell";
      });
    } else {
      pickPosition.overall++;
      pickPosition.pick++;
    }
    dispatch({
      type: FETCH_PICK_POSITION,
      payload: pickPosition
    })
  }

}
