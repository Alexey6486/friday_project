import React, {PropsWithChildren} from "react";
import s from './EditPack.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {editPackTC, PackStateType} from "../../reducers/packsReducer/packsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {EditPackObject} from "../../api/packsApi";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";
import {AuthStateType} from "../../reducers/authReducers/loginReducer";

type PropsType = {
    toggleEditPackPopUp: (_id: string) => void
    id: string
}

export const EditPack = (props: PropsType) => {

    const {toggleEditPackPopUp, id} = props;

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, onlyMyPacks} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const onSubmit = (formData: EditPackObject) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        dispatch(editPackTC(
            {
                page: fromServer.page,
                pageCount: fromServer.pageCount,
                user_id: checkFlag,
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
                <Field component={Input} type={'text'} name={'name'} placeholder={'new pack name'} value={'test'}
                       validate={[fieldRequired]}/>
            </div>
            <button>Save</button>
        </form>
    )
};

const EditPackReduxForm = reduxForm<EditPackObject>({
    form: 'EditPackForm'
})(EditPackForm);