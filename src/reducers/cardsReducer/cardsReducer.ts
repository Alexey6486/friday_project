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
const IS_YOUR_PACK = 'IS_YOUR_PACK';
const SET_CURRENT_CARDS_PAGE = 'SET_CURRENT_CARDS_PAGE';
const SET_SHOW_CARDS_BY = 'SET_SHOW_CARDS_BY';
const CHANGE_CARDS_PORTION = 'CHANGE_CARDS_PORTION';
const SET_CARDS_PORTION = 'SET_CARDS_PORTION';
const SORT_CARDS = 'SORT_CARDS';
const SET_CARDS_SORT_PARAM = 'SET_CARDS_SORT_PARAM';

type GetCardsACType = {
    type: typeof GET_CARDS
    payload: GetCardsResponseObjectType
}
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};
type IsYourPackACType = {
    type: typeof IS_YOUR_PACK
    isYourPack: boolean
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

type ActionTypes = GetCardsACType | LoadingACType | IsYourPackACType | SetCurrentPageACType | SetShowByACType | ChangePortionACType | SetPortionACType | SortCardsACType | SetCardsSortParamACType;
type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;

const loadingAC = (isLoading: boolean): LoadingACType => {
    return {
        type: LOADING,
        isLoading
    }
};
const getCardsAC = (payload: GetCardsResponseObjectType): GetCardsACType => {
    return {
        type: GET_CARDS,
        payload,
    }
};
export const isYourPackAC = (isYourPack: boolean): IsYourPackACType => {
    return {
        type: IS_YOUR_PACK,
        isYourPack
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
    isLoading: false
    isYourPack: boolean,
};

const initState: CardsStateType = {
    fromCardsServer: {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 1,
        pageCount: 5,
    },
    sortBy: true,
    sortParam: '',
    currentPortion: 1,
    isLoading: false,
    isYourPack: false,
};

export const cardsReducer = (state: CardsStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case LOADING:
            return {...state, isLoading: action.isLoading};
        case GET_CARDS:
            return {
                ...state,
                fromCardsServer: {
                    ...state.fromCardsServer,
                    cards: action.payload.cards,
                    cardsTotalCount: action.payload.cardsTotalCount
                },
            }
        case IS_YOUR_PACK:
            return {...state, isYourPack: action.isYourPack};
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
        default:
            return state;
    }
};

export const getCardsTC = (params: CardsParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const createCardTC = (params: CardsParamTypes, payload: CreateCardObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.createCard(payload);
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const editCardTC = (params: CardsParamTypes, payload: EditCardObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.editCard(payload);
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const deleteCardTC = (params: CardsParamTypes, id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await cardsApi.deleteCard(id);
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const changePageTC = (params: CardsParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(setCurrentPageAC(params.page));
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const showByTC = (params: CardsParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(setShowByAC(params.pageCount));
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
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
export const sortCardsTC = (params: CardsParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(sortCardsAC());
        if (params.sortPacks) {
            dispatch(setCardsSortParamAC(params.sortPacks))
        }
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};