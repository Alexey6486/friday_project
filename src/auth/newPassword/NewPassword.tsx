import React, {PropsWithChildren} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../authStyles/authStyles.module.css";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired, minLength} from "../../utils/formValidation/formValidation";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {errorTC, SetNewPasswordStateType, setNewPasswordTC} from "../../reducers/authReducers/newPasswordReducer";
import {AppRootStateType} from "../../store/store";
import {AuthLoading} from "../../utils/loading/authLoading/AuthLoading";

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
    const {passwordIsSet, isLoading, error} = setNewPasswordState;


    const onSubmit = (newData: SetNewPasswordFormType) => {
        const token = props.match.params.token;

        if (newData.password === newData.repeatPassword) {
            dispatch(setNewPasswordTC(newData.password, token))
        } else {
            dispatch(errorTC());
            return;
        }
    }

    if (passwordIsSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.authFormBlock}>
            <div className={s.authFormWrap}>
                <div className={s.authFormTitle}>New password</div>
                <ReduxSetNewPasswordForm onSubmit={onSubmit}/>
                {
                    isLoading &&
                    <AuthLoading/>
                }
            </div>
            {
                error &&
                <div className={s.authFormError}>
                    {error}
                </div>
            }
        </div>
    )
};
const minLengthValidation = minLength(8);
const SetNewPasswordForm: React.FC<InjectedFormProps<SetNewPasswordFormType>> = (props: PropsWithChildren<InjectedFormProps<SetNewPasswordFormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.authForm}>
            <div className={s.authForm__formGroup}>
                <Field component={Input} type={'password'}
                       placeholder={'password'} validate={[fieldRequired, minLengthValidation]}
                       id={'newPassword'} name={'password'}/>
            </div>
            <div className={s.authForm__formGroup}>
                <Field component={Input} placeholder={'repeat password'} type={'password'}
                       validate={[fieldRequired]}
                       id={'newRepeatPassword'} name={'repeatPassword'}/>
            </div>
            <div className={s.authForm__formGroup}>
                <button>Send</button>
            </div>
        </form>
    )
};

const ReduxSetNewPasswordForm = reduxForm<SetNewPasswordFormType>({
    form: 'SetNewPasswordForm'
})(SetNewPasswordForm);

export const NewPasswordWithRouter = withRouter(NewPassword);