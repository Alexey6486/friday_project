import React, {PropsWithChildren} from "react";
import s from './Search.module.scss';
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Input} from "../formFields/formFields";
import {SearchPackObject} from "../../api/packsApi";
import {getPacksTC, PackStateType} from "../../reducers/packsReducer/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export const Search = () => {

    const dispatch = useDispatch();

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer} = packsState;

    const onSubmit = (formData: SearchPackObject) => {
        const query = formData.name;

        if (query) {
            dispatch(getPacksTC({
                page: fromServer.page,
                pageCount: fromServer.pageCount,
                packName: query
            }))
            dispatch(reset('SearchForm'));
        } else {
            dispatch(getPacksTC({
                page: fromServer.page,
                pageCount: fromServer.pageCount,
            }))
            dispatch(reset('SearchForm'));
        }
    }

    return (
        <div className={s.searchBlock}>
            <SearchReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const SearchForm: React.FC<InjectedFormProps<SearchPackObject>> = (props: PropsWithChildren<InjectedFormProps<SearchPackObject>>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} type={'text'} name={'name'} placeholder={'search by name'}/>
            <button>Search</button>
        </form>
    )
};

const SearchReduxForm = reduxForm<SearchPackObject>({form: 'SearchForm'})(SearchForm);