import React, {PropsWithChildren} from "react";
import s from './EditPack.module.scss';
import s2 from '../../utils/formFields/formField.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {editPackTC, PackStateType} from "../../reducers/packsReducer/packsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {EditPackObject} from "../../api/packsApi";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";

type PropsType = {
    toggleEditPackPopUp: (_id: string) => void
    id: string
}

export const EditPack = (props: PropsType) => {

    const {toggleEditPackPopUp, id} = props;

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer} = packsState;

    const onSubmit = (formData: EditPackObject) => {
        dispatch(editPackTC(
            {
                page: fromServer.page,
                pageCount: fromServer.pageCount
            },
            {
                _id: id,
                name: formData.name,
            }));
        toggleEditPackPopUp('');
    }

    const onClose = () => {
        toggleEditPackPopUp('')
    }

    return (
        <div className={s.editPack}>
            <div className={s.editPack__formWrap}>
                <div className={s.close} onClick={onClose}></div>
                <EditPackReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

const EditPackForm: React.FC<InjectedFormProps<EditPackObject>> = (props: PropsWithChildren<InjectedFormProps<EditPackObject>>) => {

    return (
        <form className={s.editPack__form} onSubmit={props.handleSubmit}>
            <div className={s.editPack__formGroup}>
                <Field component={Input} type={'text'} name={'name'} placeholder={'pack name'}
                       validate={[fieldRequired]}/>
            </div>
            <button>Save</button>
        </form>
    )
};

const EditPackReduxForm = reduxForm<EditPackObject>({
    form: 'EditPackForm'
})(EditPackForm);