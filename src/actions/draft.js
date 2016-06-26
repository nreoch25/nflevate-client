import axios from "axios";
const API_URL = "http://localhost:8000";
import { FETCH_PICK_POSITION, FETCH_DRAFTED_PICKS } from "./types";
let pickPosition = { round: 1, pick: 1 };
let draftedPlayers = [
  {
    "round": 1,
    "pick": 1,
    "name": "Andrew Luck",
    "pos": "QB",
    "team": "IND",
    "bye": "10"
  },
  {
    "round": 1,
    "pick": 2,
    "name": "Leveon Bell",
    "pos": "RB",
    "team": "PIT",
    "bye": "8"
  },
  {
    "round": 1,
    "pick": 3,
    "name": "Antonio Brown",
    "pos": "WR",
    "team": "PIT",
    "bye": "10"
  }
];

export function fetchDraftedPicks() {
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
