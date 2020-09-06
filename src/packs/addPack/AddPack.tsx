import React, {PropsWithChildren} from "react";
import s from './AddPack.module.scss';
import s2 from '../../utils/formFields/formField.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {createPackTC, PackStateType} from "../../reducers/packsReducer/packsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CreatePackObject} from "../../api/packsApi";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";
import {AuthStateType} from "../../reducers/authReducers/loginReducer";

type PropsType = {
    toggleCreatePackPopUp: () => void
}

export const AddPack = (props: PropsType) => {

    const {toggleCreatePackPopUp} = props;

    const dispatch = useDispatch();
    // const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    // const {fromServer, onlyMyPacks} = packsState;
    //
    // const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    // const {userProfile} = authState;

    const onSubmit = (formData: CreatePackObject) => {
        //const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        dispatch(createPackTC(
            // {
            //     page: fromServer.page,
            //     pageCount: fromServer.pageCount,
            //     user_id: checkFlag,
            // },
            {
                name: formData.name,
                private: formData.private = false
            }));
        toggleCreatePackPopUp();
    }

    const onClose = () => {
        toggleCreatePackPopUp()
    }

    return (
        <div className={s.createPack}>
            <div className={s.createPack__formWrap}>
                <div className={s.close} onClick={onClose}></div>
                <AddPackReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

const AddPackForm: React.FC<InjectedFormProps<CreatePackObject>> = (props: PropsWithChildren<InjectedFormProps<CreatePackObject>>) => {

    return (
        <form className={s.createPack__form} onSubmit={props.handleSubmit}>
            <div className={s.createPack__formGroup}>
                <Field component={Input} type={'text'} name={'name'} placeholder={'pack name'}
                       validate={[fieldRequired]}/>
            </div>
            <div className={s2.checkboxGroup}>
                <Field component={Input} type={'checkbox'} name={'private'} id={'checkboxAddPack'}/>
                <label htmlFor="checkboxAddPack">Private</label>
            </div>
            <button>Create</button>
        </form>
    )
};

const AddPackReduxForm = reduxForm<CreatePackObject>({
    form: 'AddPackForm'
})(AddPackForm);