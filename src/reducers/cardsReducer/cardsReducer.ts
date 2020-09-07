import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    cardsApi,
    CardsParamTypes,
    CreateCardObject,
    EditCardObject,
    GetCardsResponseObjectType
} from "../../api/cardsApi";
import {AppRootStateType} from "../../store/store";
import {packsApi, ParamTypes} from "../../api/packsApi";

const LOADING = 'LOADING';
const GET_CARDS = 'GET_CARDS';
const PACK_ID = 'PACK_ID';
const SET_CURRENT_CARDS_PAGE = 'SET_CURRENT_CARDS_PAGE';
const SET_SHOW_CARDS_BY = 'SET_SHOW_CARDS_BY';
const CHANGE_CARDS_PORTION = 'CHANGE_CARDS_PORTION';
const SET_CARDS_PORTION = 'SET_CARDS_PORTION';
const SORT_CARDS = 'SORT_CARDS';
const SET_CARDS_SORT_PARAM = 'SET_CARDS_SORT_PARAM';
const SET_MIN_MAX_GRADE = 'SET_MIN_MAX_GRADE';
const SEARCH_CARDS = 'SEARCH_CARDS';

type SetMinMaxGradeACType = {
    type: typeof SET_MIN_MAX_GRADE
    min: number
    max: number
};
type SearchCardsACType = {
    type: typeof SEARCH_CARDS
    cardAnswer: string
    cardQuestion: string
};
type GetCardsACType = {
    type: typeof GET_CARDS
    payload: GetCardsResponseObjectType
}
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};
type PackIdACType = {
    type: typeof PACK_ID
    packId: string
};
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_CARDS_PAGE
    page: number
};
type SetShowByACType = {
    type: typeof SET_SHOW_CARDS_BY
    pageCount: number
};
type ChangePortionACType = {
    type: typeof CHANGE_CARDS_PORTION
    flag: boolean
};
type SetPortionACType = {
    type: typeof SET_CARDS_PORTION
    portion: number
};
type SortCardsACType = {
    type: typeof SORT_CARDS
};
type SetCardsSortParamACType = {
    type: typeof SET_CARDS_SORT_PARAM
    sortParam: string
};

type ActionTypes = SearchCardsACType | SetMinMaxGradeACType | GetCardsACType | LoadingACType | PackIdACType | SetCurrentPageACType | SetShowByACType | ChangePortionACType | SetPortionACType | SortCardsACType | SetCardsSortParamACType;
type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;

const loadingAC = (isLoading: boolean): LoadingACType => {
    return {
        type: LOADING,
        isLoading
    }
};
export const setMinMaxGradeAC = (min: number, max: number): SetMinMaxGradeACType => {
    return {
        type: SET_MIN_MAX_GRADE,
        min,
        max,
    }
};
export const searchCardsAC = (cardAnswer: string, cardQuestion: string): SearchCardsACType => {
    return {
        type: SEARCH_CARDS,
        cardAnswer,
        cardQuestion
    }
};
const getCardsAC = (payload: GetCardsResponseObjectType): GetCardsACType => {
    return {
        type: GET_CARDS,
        payload,
    }
};
export const packIdAC = (packId: string): PackIdACType => {
    return {
        type: PACK_ID,
        packId
    }
};
export const setCurrentPageAC = (page: number): SetCurrentPageACType => {
    return {
        type: SET_CURRENT_CARDS_PAGE,
        page
    }
};
const setShowByAC = (pageCount: number): SetShowByACType => {
    return {
        type: SET_SHOW_CARDS_BY,
        pageCount
    }
};
const changePortionAC = (flag: boolean): ChangePortionACType => {
    return {
        type: CHANGE_CARDS_PORTION,
        flag
    }
};
const setPortionAC = (portion: number): SetPortionACType => {
    return {
        type: SET_CARDS_PORTION,
        portion
    }
};
const sortCardsAC = (): SortCardsACType => {
    return {
        type: SORT_CARDS
    }
};
const setCardsSortParamAC = (sortParam: string): SetCardsSortParamACType => {
    return {
        type: SET_CARDS_SORT_PARAM,
        sortParam,
    }
};

export type CardsStateType = {
    fromCardsServer: GetCardsResponseObjectType
    sortBy: boolean
    sortParam: string
    currentPortion: number
    isLoading: boolean
    packId: string
    searchParams: {
        cardAnswer: string,
        cardQuestion: string
    }
    sortMin: number
    sortMax: number
};

const initState: CardsStateType = {
    fromCardsServer: {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 5,
        minGrade: 0,
        page: 1,
        pageCount: 5,
    },
    sortBy: true,
    sortParam: '',
    currentPortion: 1,
    isLoading: false,
    packId: '',
    searchParams: {
        cardAnswer: '',
        cardQuestion: '',
    },
    sortMin: 0,
    sortMax: 5,
};

export const cardsReducer = (state: CardsStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_MIN_MAX_GRADE:
            return {...state, sortMin: action.min, sortMax: action.max};
        case GET_CARDS:
            return {
                ...state,
                fromCardsServer: {
                    ...state.fromCardsServer,
                    cards: action.payload.cards,
                    cardsTotalCount: action.payload.cardsTotalCount
                },
            }
        case PACK_ID:
            return {...state, packId: action.packId};
        case SET_SHOW_CARDS_BY:
            return {...state, fromCardsServer: {...state.fromCardsServer, pageCount: action.pageCount}};
        case CHANGE_CARDS_PORTION:
            return {...state, currentPortion: action.flag ? state.currentPortion + 1 : state.currentPortion - 1};
        case SET_CARDS_PORTION:
            return {...state, currentPortion: action.portion};
        case SET_CURRENT_CARDS_PAGE:
            return {...state, fromCardsServer: {...state.fromCardsServer, page: action.page}};
        case SET_CARDS_SORT_PARAM:
            return {...state, sortParam: action.sortParam};
        case SORT_CARDS:
            return {...state, sortBy: !state.sortBy};
        case SEARCH_CARDS:
            return {...state, searchParams: {...state.searchParams, cardAnswer: action.cardAnswer, cardQuestion: action.cardQuestion}};
        default:
            return state;
    }
};

export const getCardsTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>, getState: () => AppRootStateType) => {
    dispatch(loadingAC(true));
    try {
        const state = getState();

        const paramObject = {
            page: state.cardsReducer.fromCardsServer.page,
            pageCount: state.cardsReducer.fromCardsServer.pageCount,
            sortCards: state.cardsReducer.sortParam,
            cardsPack_id: state.cardsReducer.packId,
            max: state.cardsReducer.sortMax,
            min: state.cardsReducer.sortMin,
            cardAnswer: state.cardsReducer.searchParams.cardAnswer,
            cardQuestion: state.cardsReducer.searchParams.cardQuestion,
        }

        const res = await cardsApi.getCards(paramObject);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const createCardTC = (payload: CreateCardObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.createCard(payload);
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const editCardTC = (payload: EditCardObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.editCard(payload);
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const deleteCardTC = (id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.deleteCard(id);
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const changePageTC = (page: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(setCurrentPageAC(page));
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const showByTC = (pageCount: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(setShowByAC(pageCount));
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const changePortionTC = (flag: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(changePortionAC(flag));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const setPortionTC = (portion: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(setPortionAC(portion));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const sortCardsTC = (sortCards: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(sortCardsAC());
        dispatch(setCardsSortParamAC(sortCards));
        dispatch(getCardsTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};