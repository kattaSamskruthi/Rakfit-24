import { combineReducers } from "redux";

import lookReducer from "./lookReducer";
import sessionReducer from "./sessionReducer";
import sessionErrorReducer from "./sessionErrorReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  sessionError: sessionErrorReducer,
  look: lookReducer,
  product: productReducer,
});

export default rootReducer;
