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
    }
};