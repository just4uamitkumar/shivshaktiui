import { combineReducers } from "redux";
import counterReducer from "../counter";
import jyotirlingReducer from "../jyotirling";

const rootReducer = combineReducers({
  counter: counterReducer,
  jyotirling:jyotirlingReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
