import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {authApi, LoginResponseObjectType} from "../../api/authApi";

const AUTH_ME = 'AUTH_ME';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const LOADING = 'LOADING';

export type AuthMeACType = {
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
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
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
export const loadingAC = (isLoading: boolean): LoadingACType => {
    return {
        type: LOADING,
        isLoading,
    }
};

type ActionTypes = AuthMeACType | LogoutACType | LoginACType | ErrorACType | LoadingACType;

export type AuthStateType = {
    isLoading: boolean
    isAuth: boolean
    error: string | null
    userProfile: LoginResponseObjectType
};

const authInitState = {
    isLoading: false,
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
        case LOADING:
            return {...state, isLoading: action.isLoading};
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
    dispatch(loadingAC(true));
    try {
        const res = await authApi.login(email, password, rememberMe);
        dispatch(loginAC(true, res));
        dispatch(loadingAC(false));
    } catch (e) {
        console.log(e.response.data.error)
        console.log({...e})
        if ( e.response.data.error === "not valid email/password /ᐠ-ꞈ-ᐟ\\") {
            dispatch(loadingAC(false));
            dispatch(errorAC('Incorrect password or email.'))
            setTimeout(() => {
                dispatch(errorAC(null));
            }, 3000)
        } else {
            dispatch(loadingAC(false));
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