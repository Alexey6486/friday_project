import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi, LoginResponseObjectType} from "../api/authApi";

const AUTH_ME = 'AUTH_ME';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';

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
type ErrorACType = {
    type: typeof ERROR
    error: string | null
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
export const errorAC = (error: string | null): ErrorACType => {
    return {
        type: ERROR,
        error,
    }
};

type ActionTypes = AuthMeACType | LogoutACType | LoginACType | ErrorACType;

export type AuthStateType = {
    isAuth: boolean,
    error: string | null,
    userProfile: LoginResponseObjectType,
};

const authInitState = {
    isAuth: false,
    error: null,
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
        token: '',
        tokenDeathTime: 0,
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
        case ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const authMeTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const res = await authApi.authMe();
        dispatch(authMeAC(true, res));
    } catch (e) {
        console.log(e.response.data.error)
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const res = await authApi.login(email, password, rememberMe);
        dispatch(loginAC(true, res));
    } catch (e) {
        console.log(e.response.data.error)
        console.log({...e})
        if ( e.response.data.error === "not valid email/password /ᐠ-ꞈ-ᐟ\\") {
            dispatch(errorAC('Incorrect password or email.'))
            setTimeout(() => {
                dispatch(errorAC(null));
            }, 3000)
        } else {
            dispatch(errorAC(e.response.data.error));
            setTimeout(() => {
                dispatch(errorAC(null));
            }, 3000)
        }
    }
}
export const logoutTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await authApi.logout();
        dispatch(logoutAC(false));
    } catch (e) {
        console.log(e.response.data.error)
    }
}