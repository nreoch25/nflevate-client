import { combineReducers } from 'redux';
import { reducer as form } from "redux-form";
import authReducer from "./auth_reducer";
import draftReducer from "./draft_reducer";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  draft: draftReducer
});

export default rootReducer;
