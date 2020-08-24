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
export type LogoutResponseObjectType = {
    info: string
    error: string
}

export const authApi = {
    registration(email: string, password: string){
        return instance.post('auth/register', {email, password})
            .then(res=>console.log(res.data))
    },
    authMe() {
        return instance
            .post<LoginResponseObjectType>(`auth/me`)
            .then((res) => {
                return res.data
            })
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance
            .post<LoginResponseObjectType>(`auth/login`, {
                email, password, rememberMe
            })
            .then((res) => {
                return res.data
            })
    },
    logout() {
        return instance
            .delete<LogoutResponseObjectType>(`auth/me`)
            .then((res) => {
                return res.data
            })
    }
}