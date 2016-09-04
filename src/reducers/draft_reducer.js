import { FETCH_PICK_POSITION, FETCH_DRAFTED_PICKS, FETCH_COMPLETED_DRAFTS } from "../actions/types";

export default function(state = { position: {}, draftedPicks: [] }, action) {
  switch(action.type) {
    case FETCH_PICK_POSITION:
      return { ...state, position: action.payload };
    case FETCH_DRAFTED_PICKS:
      return { ...state, draftedPicks: action.payload };
    case FETCH_COMPLETED_DRAFTS:
      return { ...state, completedDrafts: action.payload };
  }
  return state;
}
