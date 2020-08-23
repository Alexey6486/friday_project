import {ThunkDispatch} from "redux-thunk";
import {authApi} from "../api/authApi";
import {AppRootStateType} from "../store/store";
import {
    actionTypes,
    errorSuccessType,
    initialStateType,
    makeRegisterType
} from "../auth/registration/RegistrationTypes";

export const MAKE_REGISTER = 'MAKE-REGISTER';
export const SET_ERROR = 'SET-ERROR';


const initialState = {
    registrationSuccess: false,
    error: ''
};

const registrationReducer = (state: initialStateType = initialState, action: actionTypes) => {

    switch (action.type) {
        case MAKE_REGISTER:
            return {
                ...state, email: action.registrationSuccess
            };
        case SET_ERROR:
            return {
                ...state, error: action.error
            };

        default: {
            return state
        }
    }
};

export default registrationReducer

// action Creators

export const makeRegister = (registrationSuccess: boolean): makeRegisterType => ({
    type: MAKE_REGISTER,
    registrationSuccess,
});

export const errorSuccess = (error: string): errorSuccessType => ({
    type: SET_ERROR,
    error
});

//thunks

export const addRegistration = (email: string, password: string) =>
    async (dispatch: ThunkDispatch<AppRootStateType, {}, any>, getState: AppRootStateType) => {
        try {
            const setRegistration = await authApi.registration(email, password);
            dispatch(makeRegister(true))
        } catch (e) {

            dispatch(errorSuccess(e.response.data.error));
            dispatch(makeRegister(false))
        }
    };

