import axios from "axios";
import { FETCH_PLAYERS, FETCH_PLAYERS_BY_POSITION } from "./types";
import config from "../../config";
const API_URL = config.API_URL;
let players = [];

export function fetchPlayers() {
  console.log("fetch");
  return(dispatch) => {
    axios.get(`${API_URL}/players`, {
      headers: { authorization: localStorage.getItem("nflevate_token") }
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

export function removePlayer(pick) {
  let newPlayers = [];
  return(dispatch) => {
    //remove the picked player
    newPlayers = players.filter((player, i) => {
      return player.name !== pick.name;
    });
    //update the players array
    players = newPlayers;
    dispatch({
      type: FETCH_PLAYERS,
      payload: newPlayers
    });
  }
}

export function fetchPlayersByPosition(pos) {
  let position;
  if(pos === "DEF") {
    position = "dst";
  } else if(pos === "PK") {
    position = "k";
  } else {
    position = pos.toLowerCase();
  }
  let newPlayers = [];
  return(dispatch) => {
    if( position === "all" ) {
      newPlayers = players;
    } else {
      newPlayers = players.filter((player, i) => {
        return player.pos === position;
      });
    }
    console.log(newPlayers);
    dispatch({
      type: FETCH_PLAYERS_BY_POSITION,
      payload: newPlayers
    });
  }
}
