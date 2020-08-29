import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export type CardInPackType = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string
    created: string
    updated: string
    __v: number
    cardsCount: number
}
export type GetPacksReturnObject = {
    cardPacks: Array<CardInPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export interface ParamTypes extends Record<string, any> {
    packName?: string | number
    min?: string | number
    max?: string | number
    sortPacks?: string | number
    page?: string | number
    pageCount?: string | number
    user_id?: string | number
}

export const packsApi = {
    getPacks(params: ParamTypes) {

        let paramString: string = '';

        for (let i in params) {
            paramString = paramString.concat(`${i}=${params[i]}&`)
        }

        return instance
            .get(`cards/pack?${paramString}`)
            .then((res) => {

                return res.data;
            })
    }

}
