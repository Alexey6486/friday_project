import {GradeParamType, learnApi} from "../../api/learnApi";
import {AppRootStateType} from "../../store/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {cardsApi, CardType} from "../../api/cardsApi";

const GRADE_LOADING = 'GRADE_LOADING';
const LEARN_LOADING = 'LEARN_LOADING';
const GET_CARDS_TO_LEARN = 'GET_CARDS_TO_LEARN';

type GradeLoadingACType = {
    type: typeof GRADE_LOADING
    isGradeLoading: boolean
};
type LearnLoadingACType = {
    type: typeof LEARN_LOADING
    isLearnLoading: boolean
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
const gradeLoadingAC = (isGradeLoading: boolean): GradeLoadingACType => {
    return {
        type: GRADE_LOADING,
        isGradeLoading,
    }
};
const learnLoadingAC = (isLearnLoading: boolean): LearnLoadingACType => {
    return {
        type: LEARN_LOADING,
        isLearnLoading,
    }
};
type ActionTypes = GradeLoadingACType | GetCardsToLearnACType | LearnLoadingACType;

export type GradeStateType = {
    isGradeLoading: boolean
    isLearnLoading: boolean
    cards: Array<CardType>
}

const initialState: GradeStateType = {
    isGradeLoading: false,
    isLearnLoading: false,
    cards: [],
}

export const gradeReducer = (state: GradeStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GRADE_LOADING:
            return {...state, isGradeLoading: action.isGradeLoading};
        case LEARN_LOADING:
            return {...state, isLearnLoading: action.isLearnLoading};
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
        dispatch(gradeLoadingAC(false));
    }
};
export const getCardsToLearnTC = (cardsPack_id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>, getState: () => AppRootStateType) => {
    dispatch(learnLoadingAC(true));
    try {
        const state = getState();
        const params = {
            page: state.cardsReducer.fromCardsServer.page,
            pageCount: state.cardsReducer.fromCardsServer.pageCount,
            cardsPack_id,
        }
        const res = await cardsApi.getCards(params);
        dispatch(getCardsToLearnAC(res.cards))
        dispatch(learnLoadingAC(false));
    } catch (error) {
        console.log(error.response.data.error)
        dispatch(learnLoadingAC(false));
    }
};

