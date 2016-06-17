import axios from "axios";
const API_URL = "http://localhost:8000";
import { FETCH_PICK_POSITION } from "./types";
let pickPosition = { round: 1, pick: 1 }

export function fetchPickPosition() {
  return (dispatch) => {
    dispatch({
      type: FETCH_PICK_POSITION,
      payload: pickPosition
    })
  }
}
