import { FETCH_PICK_POSITION } from "../actions/types";

export default function(state = { position: {}, picks: {} }, action) {
  switch(action.type) {
    case FETCH_PICK_POSITION:
      return { ...state, position: action.payload }
  }
  return state;
}
