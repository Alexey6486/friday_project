import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi} from "../api/authApi";

const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';

type SetNewPasswordACType = {
    type: typeof SET_NEW_PASSWORD
    passwordIsSet: boolean
};

const setNewPassword = (passwordIsSet: boolean): SetNewPasswordACType => {
    return {
        type: SET_NEW_PASSWORD,
        passwordIsSet,
    }
};

type ActionTypes = SetNewPasswordACType;

export type SetNewPasswordStateType = {
    passwordIsSet: boolean
};

const SetNewPasswordInitState: SetNewPasswordStateType = {
    passwordIsSet: false,
};

export const newPassword = (state: SetNewPasswordStateType = SetNewPasswordInitState, action: ActionTypes) => {
    switch (action.type) {
        case SET_NEW_PASSWORD:
            return {...state, passwordIsSet: action.passwordIsSet};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const setNewPasswordTC = (password: string, resetPasswordToken: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await authApi.setNewPassword(password, resetPasswordToken);
        dispatch(setNewPassword(true));
    } catch (e) {
        console.log(e.response.data.error)
    }
};