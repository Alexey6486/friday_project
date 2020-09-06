import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CreatePackObject, EditPackObject, GetPacksReturnObject, packsApi} from "../../api/packsApi";
import {AppRootStateType} from "../../store/store";

const LOADING = 'LOADING';
const GET_PACKS = 'GET_PACKS';
const SORT = 'SORT';
const SET_SORT_PARAM = 'SET_SORT_PARAM';
const SHOW_MY_PACKS = 'SHOW_MY_PACKS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SHOW_BY = 'SET_SHOW_BY';
const CHANGE_PORTION = 'CHANGE_PORTION';
const SET_PORTION = 'SET_PORTION';
const SET_MIN_MAX = 'SET_MIN_MAX';
const SEARCH_PACKS = 'SEARCH_PACKS';

type GetPacksACType = {
    type: typeof GET_PACKS
    payload: GetPacksReturnObject
};
type SortACType = {
    type: typeof SORT
};
type SetSortParamACType = {
    type: typeof SET_SORT_PARAM
    sortParam: string
};
type ShowMyPacksACType = {
    type: typeof SHOW_MY_PACKS
    showMyPacks: boolean
    page: number
};
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    page: number
};
type SetShowByACType = {
    type: typeof SET_SHOW_BY
    pageCount: number
};
type ChangePortionACType = {
    type: typeof CHANGE_PORTION
    flag: boolean
};
type SetPortionACType = {
    type: typeof SET_PORTION
    portion: number
};
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};
type SetMinMaxACType = {
    type: typeof SET_MIN_MAX
    min: number
    max: number
};
type SearchPacksACType = {
    type: typeof SEARCH_PACKS
    packName: string
};

const getPacksAC = (payload: GetPacksReturnObject): GetPacksACType => {
    return {
        type: GET_PACKS,
        payload,
    }
};
const sortAC = (): SortACType => {
    return {
        type: SORT
    }
};
const setSortParamAC = (sortParam: string): SetSortParamACType => {
    return {
        type: SET_SORT_PARAM,
        sortParam,
    }
};
const showMyPacksAC = (showMyPacks: boolean, page: number): ShowMyPacksACType => {
    return {
        type: SHOW_MY_PACKS,
        showMyPacks,
        page
    }
};
const setCurrentPageAC = (page: number): SetCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE,
        page
    }
};
const setShowByAC = (pageCount: number): SetShowByACType => {
    return {
        type: SET_SHOW_BY,
        pageCount
    }
};
const changePortionAC = (flag: boolean): ChangePortionACType => {
    return {
        type: CHANGE_PORTION,
        flag
    }
};
const setPortionAC = (portion: number): SetPortionACType => {
    return {
        type: SET_PORTION,
        portion
    }
};
const loadingAC = (isLoading: boolean): LoadingACType => {
    return {
        type: LOADING,
        isLoading
    }
};
export const setMinMaxAC = (min: number, max: number): SetMinMaxACType => {
    return {
        type: SET_MIN_MAX,
        min,
        max,
    }
};
export const searchPacksAC = (packName: string): SearchPacksACType => {
    return {
        type: SEARCH_PACKS,
        packName
    }
};

type ActionTypes =
    GetPacksACType
    | SortACType
    | ShowMyPacksACType
    | SetCurrentPageACType
    | SetShowByACType
    | ChangePortionACType
    | SetPortionACType
    | LoadingACType
    | SetSortParamACType
    | SetMinMaxACType
    | SearchPacksACType;

export type PackStateType = {
    fromServer: GetPacksReturnObject
    sortBy: boolean
    sortParam: string
    onlyMyPacks: boolean
    currentPortion: number
    isLoading: boolean
    sortMin: number
    sortMax: number
    searchParam: string
};

const initState: PackStateType = {
    fromServer: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 20,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
    },
    sortBy: true,
    sortParam: '',
    onlyMyPacks: false,
    currentPortion: 1,
    isLoading: false,
    sortMin: 0,
    sortMax: 20,
    searchParam: '',
};

export const packsReducer = (state: PackStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case GET_PACKS:
            return {
                ...state,
                fromServer: {
                    ...state.fromServer,
                    cardPacks: action.payload.cardPacks,
                    cardPacksTotalCount: action.payload.cardPacksTotalCount,
                    maxCardsCount: action.payload.maxCardsCount < 20 ? 20 : action.payload.maxCardsCount,
                }
            };
        case SET_CURRENT_PAGE:
            return {...state, fromServer: {...state.fromServer, page: action.page}};
        case SET_SHOW_BY:
            return {...state, fromServer: {...state.fromServer, pageCount: action.pageCount}};
        case CHANGE_PORTION:
            return {...state, currentPortion: action.flag ? state.currentPortion + 1 : state.currentPortion - 1};
        case SET_PORTION:
            return {...state, currentPortion: action.portion};
        case SET_SORT_PARAM:
            return {...state, sortParam: action.sortParam};
        case SORT:
            return {...state, sortBy: !state.sortBy};
        case SHOW_MY_PACKS:
            return {...state, onlyMyPacks: action.showMyPacks, fromServer: {...state.fromServer, page: action.page}};
        case LOADING:
            return {...state, isLoading: action.isLoading};
        case SET_MIN_MAX:
            return {...state, sortMin: action.min, sortMax: action.max};
        case SEARCH_PACKS:
            return {...state, searchParam: action.packName}
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;

export const getPacksTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>, getState: () => AppRootStateType) => {
    dispatch(loadingAC(true));
    try {
        const state = getState();

        const paramObject = {
            page: state.packsReducer.fromServer.page,
            pageCount: state.packsReducer.fromServer.pageCount,
            sortPacks: state.packsReducer.sortParam,
            user_id: state.packsReducer.onlyMyPacks ? state.authReducer.userProfile._id : '',
            max: state.packsReducer.sortMax,
            min: state.packsReducer.sortMin,
            packName: state.packsReducer.searchParam,
        }

        const res = await packsApi.getPacks(paramObject);
        dispatch(getPacksAC(res));
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const createPackTC = (payload: CreatePackObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await packsApi.createPack(payload);
        dispatch(getPacksTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const editPackTC = (payload: EditPackObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await packsApi.editPack(payload);
        dispatch(getPacksTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const deletePackTC = (id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        await packsApi.deletePack(id);
        dispatch(getPacksTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const sortTC = (sortPacks: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(sortAC());
        if (sortPacks) {
            dispatch(setSortParamAC(sortPacks))
        }
        dispatch(getPacksTC());
        dispatch(loadingAC(false));
    } catch (error) {
        dispatch(loadingAC(false));
        console.log(error.response.data.error);
    }
};
export const showOnlyMyPacksTC = (showMyPacks: boolean, page: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingAC(true));
    try {
        dispatch(showMyPacksAC(showMyPacks, page));
        dispatch(getPacksTC());
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
        dispatch(getPacksTC());
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
        dispatch(getPacksTC());
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