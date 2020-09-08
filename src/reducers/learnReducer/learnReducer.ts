import {GradeParamType, learnApi} from "../../api/learnApi";
import {getCardsTC} from "../cardsReducer/cardsReducer";
import {AppRootStateType} from "../../store/store";
import {ThunkAction, ThunkDispatch } from "redux-thunk";
import {cardsApi, CardType} from "../../api/cardsApi";

const GRADE_LOADING = 'GRADE_LOADING';
const GET_CARDS_TO_LEARN = 'GET_CARDS_TO_LEARN';

type GradeLoadingACType = {
    type: typeof GRADE_LOADING
    isLoading: boolean
};
type GetCardsToLearnACType = {
    type: typeof GET_CARDS_TO_LEARN
    cards: Array<CardType>
};
const getCardsToLearnAC = (cards: Array<CardType>): GetCardsToLearnACType => {
    return {
        type: GET_CARDS_TO_LEARN,
        cards,
    }
};
const gradeLoadingAC = (isLoading: boolean): GradeLoadingACType => {
    return {
        type: GRADE_LOADING,
        isLoading,
    }
};
type ActionTypes = GradeLoadingACType | GetCardsToLearnACType;

export type GradeStateType = {
    isLoading: boolean
    cards: Array<CardType>
}

const initialState: GradeStateType = {
    isLoading: false,
    cards: []
}

export const gradeReducer = (state: GradeStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GRADE_LOADING:
            return {...state, isLoading: action.isLoading};
        case GET_CARDS_TO_LEARN:
            return {...state, cards: action.cards};
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
};
export const getCardsToLearnTC = (cardsPack_id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>, getState: () => AppRootStateType) => {
    dispatch(gradeLoadingAC(true));
    try {
        const state = getState();
        const params = {
            page: state.cardsReducer.fromCardsServer.page,
            pageCount: state.cardsReducer.fromCardsServer.pageCount,
            cardsPack_id,
        }
        const res = await cardsApi.getCards(params);
        dispatch(getCardsToLearnAC(res.cards))
        dispatch(gradeLoadingAC(false));
    } catch (error) {
        console.log(error.response.data.error)
        dispatch(gradeLoadingAC(false));
    }
};

