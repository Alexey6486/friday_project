import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi} from "../api/authApi";

const AUTH_ME = 'AUTH_ME';

type AuthMeACType = {
    type: typeof AUTH_ME
    isAuth: boolean
};

const authMeAC = (isAuth: boolean): AuthMeACType => {
    return {
        type: AUTH_ME,
        isAuth,
    }
};

type ActionTypes = AuthMeACType;

export type AuthStateType = {
    isAuth: boolean,
};

const authInitState = {
    isAuth: false,
};

export const authReducer = (state: AuthStateType = authInitState, action: ActionTypes) => {
    switch (action.type) {
        case AUTH_ME:
            return {...state, isAuth: action.isAuth};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await authApi.login(email, password, rememberMe);
    dispatch(authMeAC(true));
}