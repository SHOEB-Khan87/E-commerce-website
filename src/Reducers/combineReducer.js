import { Set_reducer, desc_Reducer, Cart_Reducer } from ".";
import { combineReducers } from "redux";

export const RootReducer = combineReducers({
    Set_reducer,
    desc_Reducer,
    Cart_Reducer
});