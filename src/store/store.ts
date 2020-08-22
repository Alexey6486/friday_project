import {applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import  thunkMiddleware from 'redux-thunk';
import {authReducer} from "../reducers/loginReducer";
import registrationReducer from "../reducers/registrationReducer";

const rootReducers = combineReducers({
    form: formReducer,
    authReducer,
    registrationReducer
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));