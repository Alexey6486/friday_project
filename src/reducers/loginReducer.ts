import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi, LoginResponseObjectType} from "../api/authApi";

const AUTH_ME = 'AUTH_ME';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

type AuthMeACType = {
    type: typeof AUTH_ME
    isAuth: boolean
    userProfile: LoginResponseObjectType
};
type LoginACType = {
    type: typeof LOGIN
    isAuth: boolean
    userProfile: LoginResponseObjectType
};
type LogoutACType = {
    type: typeof LOGOUT
    isAuth: boolean
};

export const authMeAC = (isAuth: boolean, userProfile: LoginResponseObjectType): AuthMeACType => {
    return {
        type: AUTH_ME,
        isAuth,
        userProfile
    }
};
export const loginAC = (isAuth: boolean, userProfile: LoginResponseObjectType): LoginACType => {
    return {
        type: LOGIN,
        isAuth,
        userProfile
    }
};
export const logoutAC = (isAuth: boolean): LogoutACType => {
    return {
        type: LOGOUT,
        isAuth,
    }
};

type ActionTypes = AuthMeACType | LogoutACType | LoginACType;

export type AuthStateType = {
    isAuth: boolean,
    userProfile: LoginResponseObjectType
};

const authInitState = {
    isAuth: false,
    userProfile: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0, // количество колод
        created: '',
        updated: '',
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: '',
    }
};

export const authReducer = (state: AuthStateType = authInitState, action: ActionTypes) => {
    switch (action.type) {
        case AUTH_ME:
            return {...state, isAuth: action.isAuth, userProfile: action.userProfile};
        case LOGIN:
            return {...state, isAuth: action.isAuth, userProfile: action.userProfile};
        case LOGOUT:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const authMeTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const res = await authApi.authMe();
        if (!localStorage.getItem('isAuth')) {
            localStorage.setItem('isAuth', '1');
            dispatch(authMeAC(true, res));
        }
    } catch (e) {
        console.log(e.response.data.error)
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const res = await authApi.login(email, password, rememberMe);
        localStorage.setItem('isAuth', '1');
        dispatch(authMeAC(true, res));
    } catch (e) {
        console.log(e.response.data.error)
    }
}
export const logoutTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await authApi.logout();
        localStorage.removeItem('isAuth');
        dispatch(logoutAC(false));
    } catch (e) {
        console.log(e.response.data.error)
    }
}