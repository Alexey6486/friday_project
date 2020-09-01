
import  thunkMiddleware from 'redux-thunk';
import {authReducer} from "../reducers/authReducers/loginReducer";
import {registrationReducer} from "../reducers/authReducers/registrationReducer";
import {restorePasswordReducer} from "../reducers/authReducers/restorePasswordReducer";
import {newPassword} from "../reducers/authReducers/newPasswordReducer";
import {appReducer} from "../app/appReducer";
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import {packsReducer} from "../reducers/packsReducer/packsReducer";
import {cardsReducer} from "../reducers/cardsReducer/cardsReducer";

const rootReducers = combineReducers({
    form: formReducer,
    authReducer,
    registrationReducer,
    restorePasswordReducer,
    newPassword,
    appReducer,
    packsReducer,
    cardsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));