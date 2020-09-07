import {GradeParamType, learnApi} from "../../api/learnApi";
import {getCardsTC} from "../cardsReducer/cardsReducer";
import {AppRootStateType} from "../../store/store";
import {ThunkAction, ThunkDispatch } from "redux-thunk";

const GRADE_LOADING = 'GRADE_LOADING';

type GradeLoadingACType = {
    type: typeof GRADE_LOADING
    isLoading: boolean
}
const gradeLoadingAC = (isLoading: boolean): GradeLoadingACType => {
    return {
        type: GRADE_LOADING,
        isLoading,
    }
}

type ActionTypes = GradeLoadingACType;

export type GradeStateType = {
    isLoading: boolean
}

const initialState: GradeStateType = {
    isLoading: false
}

export const gradeReducer = (state: GradeStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GRADE_LOADING:
            return {...state, isLoading: action.isLoading};
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const learnTC = (gradeParam: GradeParamType): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(gradeLoadingAC(true));
    try {
        await learnApi.grade(gradeParam);
        dispatch(gradeLoadingAC(false));
    } catch (error) {
        console.log(error.response.data.error)
    }
}

