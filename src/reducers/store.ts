import {applyMiddleware, combineReducers, createStore} from "redux";

import thunk from "redux-thunk";
import registrationReducer from "./registrationReducer";



const rootReducer = combineReducers({
    registration: registrationReducer});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


const store = createStore(rootReducer, applyMiddleware(thunk));
export default store
