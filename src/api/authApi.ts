import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
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
    token: string
    tokenDeathTime: number
}
export type LogoutResponseObjectType = {
    info: string
    error: string
}
export type ForgotPasswordResponseObjectType = {
    info: string
    error: string
}

export const authApi = {
    registration(email: string, password: string) {
        return instance.post('auth/register', {email, password})
            .then(res => console.log(res.data))
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
    },
    restorePassword(email: string, from: string, message: string) {
        return instance
            .post<ForgotPasswordResponseObjectType>(`auth/forgot`, {
                email, from, message
            })
            .then((res) => {
                return res.data
            })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance
            .post<ForgotPasswordResponseObjectType>(`auth/set-new-password`, {
                password, resetPasswordToken
            })
            .then((res) => {
                return res.data
            })
    },
}