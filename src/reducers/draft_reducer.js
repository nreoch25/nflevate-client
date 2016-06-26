import { FETCH_PICK_POSITION, FETCH_DRAFTED_PICKS } from "../actions/types";

export default function(state = { position: {}, draftedPicks: [] }, action) {
  switch(action.type) {
    case FETCH_PICK_POSITION:
      return { ...state, position: action.payload };
    case FETCH_DRAFTED_PICKS:
      return { ...state, draftedPicks: action.payload };
  }
  return state;
}
