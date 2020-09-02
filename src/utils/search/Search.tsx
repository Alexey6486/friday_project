import React, {PropsWithChildren, useState} from "react";
import s from './Search.module.scss';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../formFields/formFields";
import {SearchObject} from "../../api/packsApi";

type PropsToReduxType = {
    searchBy: Array<string>
}
type PropsType = PropsToReduxType & {
    onSearchSubmit: (queryParam: SearchObject) => void
}

export const Search = (props: PropsType) => {

    const {searchBy, onSearchSubmit} = props;

    const onSubmit = (formData: SearchObject) => {
        const query = formData;
        if (query) {
            onSearchSubmit(query);
        }
    }

    return (
        <div className={s.searchBlock}>
            <SearchReduxForm onSubmit={onSubmit} searchBy={searchBy}/>
        </div>
    )
};

const SearchForm: React.FC<InjectedFormProps<SearchObject, PropsToReduxType> & PropsToReduxType> = (props: PropsWithChildren<InjectedFormProps<SearchObject, PropsToReduxType>> & PropsToReduxType) => {

    const {searchBy} = props;

    const [open, setOpen] = useState(false);
    const [searchParam, setSearchParam] = useState(searchBy[0]);

    const searchOptionHandler = (param: string) => {
        setSearchParam(param);
        setOpen(prev => !prev);
    }

    const searchByMap = searchBy.map((i, idx) => <div key={idx} onClick={() => searchOptionHandler(i)}>{i}</div>);

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.searchFieldGroup}>
                <Field component={Input} type={'text'} name={`${searchParam}`} placeholder={`search by ${searchParam}`}/>
                <div className={open ? `${s.searchOptions} ${s.open}` : `${s.searchOptions}`}>
                    {searchByMap}
                </div>
            </div>
            <div className={open ? `${s.searchOptionsBtn} ${s.open}` : `${s.searchOptionsBtn}`}
                 onClick={() => setOpen(prev => !prev)}></div>
            <button>Search</button>
        </form>
    )
};

const SearchReduxForm = reduxForm<SearchObject, PropsToReduxType>({form: 'SearchForm'})(SearchForm);