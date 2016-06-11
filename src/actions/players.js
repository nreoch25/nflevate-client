import axios from "axios";
import { FETCH_PLAYERS, FETCH_PLAYERS_BY_POSITION } from "./types";
const API_URL = "http://localhost:8000";
let players = [];

export function fetchPlayers() {
  console.log("fetch");
  return(dispatch) => {
    axios.get(`${API_URL}/players`, {
      headers: { authorization: localStorage.getItem("token") }
    })
      .then(response => {
        players = response.data;
        dispatch({
          type: FETCH_PLAYERS,
          payload: response.data
        });
      });
  }
}

export function fetchPlayersByPosition(pos) {
  let position = pos.toLowerCase();
  return(dispatch) => {
    let newPlayers = players.filter((player) => {
      return player.pos === position;
    });
    console.log(newPlayers);
  }
}
