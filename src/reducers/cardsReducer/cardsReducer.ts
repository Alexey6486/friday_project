import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    cardsApi,
    CardsParamTypes,
    CreateCardObject,
    EditCardObject,
    GetCardsResponseObjectType
} from "../../api/cardsApi";
import {AppRootStateType} from "../../store/store";

const LOADING = 'LOADING';
const GET_CARDS = 'GET_CARDS';

type GetCardsACType = {
    type: typeof GET_CARDS
    payload: GetCardsResponseObjectType
}
type LoadingACType = {
    type: typeof LOADING
    isLoading: boolean
};

type ActionTypes = GetCardsACType | LoadingACType;
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

export type CardsStateType = {
    fromServer: GetCardsResponseObjectType
    sortBy: boolean
    sortParam: string
    currentPortion: number
    isLoading: false
};

const initState: CardsStateType = {
    fromServer: {
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
};

export const cardsReducer = (state: CardsStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case LOADING:
            return {...state, isLoading: action.isLoading};
        case GET_CARDS:
            return {
                ...state,
                fromServer: {
                    ...state.fromServer,
                    cards: action.payload.cards,
                    cardsTotalCount: action.payload.cardsTotalCount
                },
            }
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