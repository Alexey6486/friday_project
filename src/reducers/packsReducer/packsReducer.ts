import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CreatePackObject, GetPacksReturnObject, packsApi, ParamTypes} from "../../api/packsApi";
import {AppRootStateType} from "../../store/store";

const GET_PACKS = 'GET_PACKS';
const SORT = 'SORT';

type GetPacksACType = {
    type: typeof GET_PACKS
    payload: GetPacksReturnObject
};
type SortACType = {
    type: typeof SORT
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

type ActionTypes = GetPacksACType | SortACType;

export type PackStateType = {
    fromServer: GetPacksReturnObject,
    sortBy: boolean,
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
export const sortTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(sortAC());
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
export const deletePackTC = (params: ParamTypes, id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        await packsApi.deletePack(id);
        const res = await packsApi.getPacks(params);
        dispatch(getPacksAC(res));
    } catch (error) {
        console.log(error.response.data.error);
    }
};