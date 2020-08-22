import {applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import  thunkMiddleware from 'redux-thunk';
import {authReducer} from "../reducers/loginReducer";

const rootReducers = combineReducers({
    form: formReducer,
    authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));