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
    sortPacks?: string
    page: number
    pageCount: number
    user_id?: string | number
}

export type CreatePackObject = {
    name?: string // если не отправить будет таким
    path?: string // если не отправить будет такой
    grade?: number // не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    deckCover?: string // не обязателен
    private?: boolean// если не отправить будет такой
    type?: string // если не отправить будет таким
}
export type EditPackObject = {
    _id: string
    name?: string // если не отправить будет таким
}
export type SearchPackObject = {
    name: string
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
    },
    createPack(cardsPack: CreatePackObject) {
        return instance
            .post(`cards/pack`,{
                cardsPack
            })
            .then((res) => {
                return res.data
            })
    },
    editPack(cardsPack: EditPackObject) {
        return instance
            .put(`cards/pack`, {
                cardsPack
            })
            .then((res) => {
                return res.data
            })
    },
    deletePack(id: string) {
        return instance
            .delete(`cards/pack?id=${id}`)
            .then((res) => {
                return res.data
            })
    },
}
