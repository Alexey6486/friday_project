
//actionCreators

import {MAKE_REGISTER, SET_ERROR} from "../../reducers/registrationReducer";

export type makeRegisterType = {
    type: typeof MAKE_REGISTER
    registrationSuccess: boolean
}

export type errorSuccessType = {
    type: typeof SET_ERROR
    error: string
}

export type actionTypes = makeRegisterType | errorSuccessType

//state

export type registrationInitialStateType = {
    registrationSuccess: boolean
    error: string
}
