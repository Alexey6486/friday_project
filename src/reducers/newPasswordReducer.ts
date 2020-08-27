import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi} from "../api/authApi";

const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
const ERROR = 'ERROR';
const LOADING = 'LOADING';

type SetNewPasswordACType = {
    type: typeof SET_NEW_PASSWORD
    passwordIsSet: boolean
};
type ErrorACType = {
    type: typeof ERROR
    error: string | null
};
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};

const setNewPassword = (passwordIsSet: boolean): SetNewPasswordACType => {
    return {
        type: SET_NEW_PASSWORD,
        passwordIsSet,
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

type ActionTypes = SetNewPasswordACType | ErrorACType | LoadingACType;

export type SetNewPasswordStateType = {
    passwordIsSet: boolean
    isLoading: boolean
    error: string | null
};

const SetNewPasswordInitState: SetNewPasswordStateType = {
    passwordIsSet: false,
    isLoading: false,
    error: null,
};

export const newPassword = (state: SetNewPasswordStateType = SetNewPasswordInitState, action: ActionTypes) => {
    switch (action.type) {
        case SET_NEW_PASSWORD:
            return {...state, passwordIsSet: action.passwordIsSet};
        case ERROR:
            return {...state, error: action.error};
        case LOADING:
            return {...state, isLoading: action.isLoading};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const setNewPasswordTC = (password: string, resetPasswordToken: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await authApi.setNewPassword(password, resetPasswordToken);
        dispatch(setNewPassword(true));
        dispatch(loadingAC(false));
    } catch (e) {
        dispatch(loadingAC(false));
        console.log(e.response.data.error)
        dispatch(errorAC(e.response.data.error));
    }
};