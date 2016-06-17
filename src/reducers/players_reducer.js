import { FETCH_PLAYERS, FETCH_PLAYERS_BY_POSITION } from "../actions/types";

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PLAYERS:
      return { ...state, players: action.payload }
    case FETCH_PLAYERS_BY_POSITION:
      return { ...state, players: action.payload }
  }
  return state;
}
