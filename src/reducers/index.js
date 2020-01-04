import { combineReducers } from "redux";
import testReducer from "./test";
import userReducer from './user';
import cartReducer from './cart';

export default combineReducers({
    testReducer,
    userReducer,
    cartReducer
})