import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi} from "../api/authApi";

const RESTORE_PASSWORD = 'RESTORE_PASSWORD';

type RestorePasswordACType = {
    type: typeof RESTORE_PASSWORD
    restored: boolean
};
const restorePasswordAC = (restored: boolean): RestorePasswordACType => {
    return {
        type: RESTORE_PASSWORD,
        restored,
    }
}

type ActionTypes = RestorePasswordACType;

export type RestorePasswordStateType = {
    restored: boolean
}
const restorePasswordInitState: RestorePasswordStateType = {
    restored: false,
}

export const restorePasswordReducer = (state: RestorePasswordStateType = restorePasswordInitState, action: ActionTypes) => {
    switch (action.type) {
        case RESTORE_PASSWORD:
            return {...state, restored: action.restored}
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const restorePasswordTC = (email: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const message =
            `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href="https://alexey6486.github.io/friday_project/#/set-new-password/$token$">link</a>
            </div>`
        await authApi.restorePassword(email, 'alexey6486@gmail.com', message);
        dispatch(restorePasswordAC(true));
    } catch (e) {
        console.log(e.response.data.error)
    }
}