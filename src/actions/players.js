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
  let newPlayers = [];
  return(dispatch) => {
    if( position === "all" ) {
      newPlayers = players;
    } else {
      newPlayers = players.filter((player, i) => {
        return player.pos === position;
      });
    }
    dispatch({
      type: FETCH_PLAYERS_BY_POSITION,
      payload: newPlayers
    });
  }
}
