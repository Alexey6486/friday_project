import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {authApi} from "../api/authApi";
import {authMeAC, AuthMeACType} from "../reducers/loginReducer";

const APP_INITIALIZED = 'APP_INITIALIZED';

type AppInitACType = {
    type: typeof APP_INITIALIZED
    isInit: boolean
};

const appInitAC = (isInit: boolean): AppInitACType => {
    return {
        type: APP_INITIALIZED,
        isInit
    }
};

type ActionTypes = AppInitACType | AuthMeACType;

export type AppStateType = {
    isInit: boolean
};

const appInitialState: AppStateType = {
    isInit: false
};

export const appReducer = (state: AppStateType = appInitialState, action: ActionTypes) => {
    switch (action.type) {
        case APP_INITIALIZED:
            return {...state, isInit: action.isInit};
        default:
            return state;
    }
};
type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const appInitializedTC = ():ThunkType  => async (dispatch: ThunkDispatch<AppStateType, {}, ActionTypes>) => {
    try {
        const res = await authApi.authMe();
        dispatch(authMeAC(true, res));
        dispatch(appInitAC(true));
    } catch (e) {
        dispatch(appInitAC(true));
        console.log(e.response.data.error)
    }

}
