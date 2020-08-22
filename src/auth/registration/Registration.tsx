import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addRegistration} from "../../reducers/registrationReducer";

export const Registration = () => {
    const [state, setState] = useState({login: '', password: '', repeatPassword: ''});
    const dispatch = useDispatch();

    const loginField = (e: React.FormEvent<HTMLInputElement>) => {
        setState({...state, login: e.currentTarget.value});
        console.log(state)
    };
    const passwordField = (e: React.FormEvent<HTMLInputElement>) => {
        setState({...state, password: e.currentTarget.value})
    };
    const rememberMeField = (e: React.FormEvent<HTMLInputElement>) => {
        setState({...state, repeatPassword: e.currentTarget.value})
    };
    const sendData = () =>{
        debugger
        dispatch(addRegistration(state.login, state.password))
    };

    return (

        <div>
            <div>Registration</div>

                <div>
                    <input placeholder={'login'} onChange={loginField}/>
                </div>
                <div>
                    <input placeholder={'password'} type={'password'} onChange={passwordField}/>
                </div>
                <div>
                    <input placeholder={'repeat password'} onChange={rememberMeField}/>
                </div>
                <div>
                    <button onClick={sendData}>Send</button>
                </div>

        </div>

    )
};

