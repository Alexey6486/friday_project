import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CreatePackObject, EditPackObject, GetPacksReturnObject, packsApi, ParamTypes} from "../../api/packsApi";
import {AppRootStateType} from "../../store/store";

const GET_PACKS = 'GET_PACKS';
const SORT = 'SORT';
const SHOW_MY_PACKS = 'SHOW_MY_PACKS';

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
const showMyPacksAC = (showMyPacks: boolean): ShowMyPacksACType => {
    return {
        type: SHOW_MY_PACKS,
        showMyPacks
    }
};

type ActionTypes = GetPacksACType | SortACType | ShowMyPacksACType;

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
        case SORT:
            return {...state, sortBy: !state.sortBy};
        case SHOW_MY_PACKS:
            return {...state, onlyMyPacks: action.showMyPacks};
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
export const sortTC = (params: ParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(sortAC());
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
export const showOnlyMyPacksTC = (params: ParamTypes, showMyPacks: boolean): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        dispatch(showMyPacksAC(showMyPacks));
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
        debugger
    } catch (error) {
        console.log(error.response.data.error);
    }
};