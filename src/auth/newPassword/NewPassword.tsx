import React, {PropsWithChildren} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../login/Login.module.css";
import {Input} from "../../utils/formFields/formFields";
import {registrationFieldsRequired} from "../../utils/formValidation/registrationValidation";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {SetNewPasswordStateType, setNewPasswordTC} from "../../reducers/newPasswordReducer";
import {AppRootStateType} from "../../store/store";

type ParamsType = {
    token: string
}
type PropsType = RouteComponentProps<ParamsType>

type SetNewPasswordFormType = {
    password: string
    repeatPassword: string
};

const NewPassword = (props: PropsType) => {

    const dispatch = useDispatch();
    const setNewPasswordState = useSelector<AppRootStateType, SetNewPasswordStateType>(state => state.newPassword);
    const {passwordIsSet} = setNewPasswordState;

    const onSubmit = (newData: SetNewPasswordFormType) => {
        const token = props.match.params.token;

        if (newData.password === newData.repeatPassword &&
            newData.password.length >= 7) {
            dispatch(setNewPasswordTC(newData.password, token))
        }
    }

    if (passwordIsSet) {
        return <Redirect to={'/friday_project/login'}/>
    }

    return (
        <div className={s.loginFormBlock}>
            <div className={s.loginFormWrap}>
                <div className={s.loginFormTitle}>New password:</div>
                <ReduxSetNewPasswordForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};
const SetNewPasswordForm: React.FC<InjectedFormProps<SetNewPasswordFormType>> = (props: PropsWithChildren<InjectedFormProps<SetNewPasswordFormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div className={s.loginForm__formGroup}>
                <Field component={Input} type={'password'}
                       placeholder={'password'} validate={[registrationFieldsRequired]}
                       id={'newPassword'} name={'password'}/>
            </div>
            <div className={s.loginForm__formGroup}>
                <Field component={Input} placeholder={'repeat password'} type={'password'}
                       validate={[registrationFieldsRequired]}
                       id={'newRepeatPassword'} name={'repeatPassword'}/>
            </div>
            <div className={s.loginForm__formGroup}>
                <button>Send</button>
            </div>
        </form>
    )
};

const ReduxSetNewPasswordForm = reduxForm<SetNewPasswordFormType>({
    form: 'SetNewPasswordForm'
})(SetNewPasswordForm);

export const NewPasswordWithRouter = withRouter(NewPassword);