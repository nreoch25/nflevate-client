import axios from "axios";
import localforage from "localforage";
import { FETCH_PLAYERS, FETCH_PLAYERS_BY_POSITION } from "./types";
import config from "../../config";
const API_URL = config.API_URL;
let players = [];

export function fetchPlayers() {
  return(dispatch) => {
    if(players.length === 0) {
      localforage.getItem("nflevate_players", (err, response) => {
        if(response) {
          players = JSON.parse(response);
          dispatch({
            type: FETCH_PLAYERS,
            payload: players
          });
        } else {
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
      });
    } else {
      dispatch({
        type: FETCH_PLAYERS,
        payload: players
      });
    }
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

export function storeRemainingPlayers() {
  return(dispatch) => {
    localforage.setItem("nflevate_players", JSON.stringify(players));
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
    dispatch({
      type: FETCH_PLAYERS_BY_POSITION,
      payload: newPlayers
    });
  }
}
