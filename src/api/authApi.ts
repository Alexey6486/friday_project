import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export type LoginResponseObjectType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error: string
}

export const authApi = {
    registration(email: string, password: string){
        //debugger
        return instance.post('auth/register', {email, password})
            .then(res=>console.log(res.data))
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        //debugger
        return instance
            .post<LoginResponseObjectType>(`auth/login`, {
                email, password, rememberMe
            })
            .then((res) => {
                //debugger
                return res.data
            })
    }
}