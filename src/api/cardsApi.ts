import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    created: string
    updated: string
    __v: number
    _id: string
    user_id: string
}
export type GetCardsResponseObjectType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

export interface CardsParamTypes extends Record<string, any> {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page: number
    pageCount: number
}

export type CreateCardObject = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type EditCardObject = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}
export type SearchCardObject = {
    name: string
}

export const cardsApi = {
    getCards(params: CardsParamTypes) {

        let paramString: string = '';

        for (let i in params) {
            paramString = paramString.concat(`${i}=${params[i]}&`)
        }

        return instance
            .get(`cards/card?${paramString}`)
            .then((res) => {
                return res.data
            })
    },
    createCard(card: CreateCardObject) {
        return instance
            .post(`cards/card`, {
                card
            })
            .then((res) => {
                return res.data
            })
    },
    editCard(card: EditCardObject) {
        return instance
            .put(`cards/card`, {
                card
            })
            .then((res) => {
                return res.data
            })
    },
    deleteCard(id: string) {
        return instance
            .delete(`cards/card?id=${id}`)
            .then((res) => {
                return res.data
            })
    },
};