
import  thunkMiddleware from 'redux-thunk';
import {authReducer} from "../reducers/loginReducer";
import registrationReducer from "../reducers/registrationReducer";
import {restorePasswordReducer} from "../reducers/restorePasswordReducer";
import {newPassword} from "../reducers/newPasswordReducer";
import {appReducer} from "../app/appReducer";
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducers = combineReducers({
    form: formReducer,
    authReducer,
    registrationReducer,
    restorePasswordReducer,
    newPassword,
    appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));