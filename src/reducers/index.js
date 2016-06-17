import { combineReducers } from 'redux';
import { reducer as form } from "redux-form";
import authReducer from "./auth_reducer";
import playersReducer from "./players_reducer";
import draftReducer from "./draft_reducer";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  players: playersReducer,
  draft: draftReducer
});

export default rootReducer;
