import { RootReducer } from "../Reducers/combineReducer";
import { legacy_createStore } from "redux";

export const store = legacy_createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());