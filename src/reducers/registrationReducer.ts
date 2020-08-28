import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authApi} from "../api/authApi";
import {AppRootStateType} from "../store/store";

const REGISTER = 'REGISTER';
const LOADING = 'LOADING';
const ERROR = 'ERROR';

type RegisterACType = {
    type: typeof REGISTER
    registrationSuccess: boolean
}
type ErrorACType = {
    type: typeof ERROR
    error: string | null
}
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};
export const loadingAC = (isLoading: boolean): LoadingACType => {
    return {
        type: LOADING,
        isLoading,
    }
};

const registerAC = (registrationSuccess: boolean): RegisterACType => ({
    type: REGISTER,
    registrationSuccess,
});
const errorAC = (error: string | null): ErrorACType => ({
    type: ERROR,
    error
});

type ActionTypes = RegisterACType | ErrorACType | LoadingACType;

export type RegistrationInitialStateType = {
    registrationSuccess: boolean
    error: string | null
    isLoading: boolean
}
const initialState = {
    registrationSuccess: false,
    error: null,
    isLoading: false,
};

export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: ActionTypes) => {

    switch (action.type) {
        case REGISTER:
            return { ...state, email: action.registrationSuccess };
        case ERROR:
            return { ...state, error: action.error };
        case LOADING:
            return {...state, isLoading: action.isLoading};
        default: {
            return state;
        }
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const addRegistration = (email: string, password: string): ThunkType =>
    async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
        dispatch(loadingAC(true));
        try {
            await authApi.registration(email, password);
            dispatch(registerAC(true));
            dispatch(loadingAC(true));
        } catch (e) {
            dispatch(errorAC(e.response.data.error));
            dispatch(loadingAC(true));
            setTimeout(() => {
                dispatch(errorAC(null));
            }, 3000)
        }
    };

