import React from "react";
import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});


export const api = {

    registration(email: string, password: string){
        debugger
        return instance.post('auth/register', {email, password})

            .then(res=>console.log(res.data))
    }

};
