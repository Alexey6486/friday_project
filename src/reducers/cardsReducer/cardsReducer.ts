import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {cardsApi, CardsParamTypes, GetCardsResponseObjectType} from "../../api/cardsApi";
import {AppRootStateType} from "../../store/store";

const GET_CARDS = 'GET_CARDS';

type GetCardsACType = {
    type: typeof GET_CARDS
    payload: GetCardsResponseObjectType
}

type ActionsType = GetCardsACType;
type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionsType>;

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

export const cardsReducer = (state: CardsStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                fromServer: {...state.fromServer, cards: action.payload.cards, cardsTotalCount: action.payload.cardsTotalCount},
            }
        default:
            return state;
    }
};


export const getCardsTC = (params: CardsParamTypes): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
    try {
        const res = await cardsApi.getCards(params);
        dispatch(getCardsAC(res))
    } catch (error) {
        console.log(error.response.data.error);
    }
};