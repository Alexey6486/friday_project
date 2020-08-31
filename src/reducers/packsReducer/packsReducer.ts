import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CreatePackObject, EditPackObject, GetPacksReturnObject, packsApi, ParamTypes} from "../../api/packsApi";
import {AppRootStateType} from "../../store/store";

const GET_PACKS = 'GET_PACKS';
const SORT = 'SORT';
const SHOW_MY_PACKS = 'SHOW_MY_PACKS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SHOW_BY = 'SET_SHOW_BY';

type GetPacksACType = {
    type: typeof GET_PACKS
    payload: GetPacksReturnObject
};
type SortACType = {
    type: typeof SORT
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

type ActionTypes = GetPacksACType | SortACType | ShowMyPacksACType | SetCurrentPageACType | SetShowByACType;

export type PackStateType = {
    fromServer: GetPacksReturnObject,
    sortBy: boolean,
    onlyMyPacks: boolean,
};

const initState: PackStateType = {
    fromServer: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
    },
    sortBy: true,
    onlyMyPacks: false,
};

export const packsReducer = (state: PackStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case GET_PACKS:
            return {...state,
                fromServer: {
                    ...state.fromServer,
                    cardPacks: action.payload.cardPacks,
                    cardPacksTotalCount: action.payload.cardPacksTotalCount
                }
            };
        case SET_CURRENT_PAGE:
            return {...state, fromServer: {...state.fromServer, page: action.page}};
        case SET_SHOW_BY:
            return {...state, fromServer: {...state.fromServer, pageCount: action.pageCount}};
        case SORT:
            return {...state, sortBy: !state.sortBy};
        case SHOW_MY_PACKS:
            return {...state, onlyMyPacks: action.showMyPacks, fromServer: {...state.fromServer, page: action.page}};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;

export const getPacksTC = (params: ParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const createPackTC = (params: ParamTypes, payload: CreatePackObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await packsApi.createPack(payload);
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const editPackTC = (params: ParamTypes, payload: EditPackObject): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await packsApi.editPack(payload);
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const deletePackTC = (params: ParamTypes, id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await packsApi.deletePack(id);
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const sortTC = (params: ParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(sortAC());
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const showOnlyMyPacksTC = (params: ParamTypes, showMyPacks: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        debugger
        dispatch(showMyPacksAC(showMyPacks, params.page));
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const changePageTC = (params: ParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(setCurrentPageAC(params.page));
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};
export const showByTC = (params: ParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(setShowByAC(params.pageCount));
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};