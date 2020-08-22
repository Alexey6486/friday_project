import {ThunkDispatch} from "redux-thunk";
import {authApi} from "../api/authApi";
import {AppRootStateType} from "../store/store";

const MAKE_REGISTER = 'MAKE-REGISTER';
const SET_ERROR = 'SET-ERROR';

type actionType = makeRegisterType | errorSuccessType

const initialState = {
    email: '',
    password: '',
    error: ''
};

const registrationReducer = (state = initialState, action: actionType) => {

    switch (action.type) {
        case MAKE_REGISTER:
            return {
                ...state, email: action.email, password: action.password
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

type makeRegisterType = {
    type: typeof MAKE_REGISTER
    email: string
    password: string
}

type errorSuccessType = {
    type: typeof SET_ERROR
    error: string
}

export const makeRegister = (email: string, password: string): makeRegisterType => ({
    type: MAKE_REGISTER,
    email,
    password
});

export const errorSuccess = (error: string): errorSuccessType => ({
    type: SET_ERROR,
    error
});

//thunks

export const addRegistration = (email: string, password: string) =>
    async (dispatch: ThunkDispatch<AppRootStateType, {}, any>, getState: AppRootStateType) => {
        try {
            const registrationSuccess = await authApi.registration(email, password);
            dispatch(makeRegister(email, password))
        } catch (e) {
            dispatch(errorSuccess(e.response.data.error))
        }
    };

