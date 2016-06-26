import axios from "axios";
const API_URL = "http://localhost:8000";
import { FETCH_PICK_POSITION, FETCH_DRAFTED_PICKS } from "./types";
let pickPosition = { round: 1, pick: 1 };
let draftedPlayers = [];

function fetchDraftedPicks() {
  return (dispatch) => {
    dispatch({
      type: FETCH_DRAFTED_PICKS,
      payload: draftedPlayers
    });
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
