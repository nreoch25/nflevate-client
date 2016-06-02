import axios from "axios";
import { FETCH_PLAYERS } from "./types";
const API_URL = "http://localhost:8000";

export function fetchPlayers() {
  console.log("fetch");
  return(dispatch) => {
    axios.get(`${API_URL}/players`, {
      headers: { authorization: localStorage.getItem("token") }
    })
      .then(response => {
        dispatch({
          type: FETCH_PLAYERS,
          payload: response.data
        });
      });
  }
}
