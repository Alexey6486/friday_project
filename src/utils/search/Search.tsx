import React, {PropsWithChildren, useEffect, useState} from "react";
import './Search.styles.scss';
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
        <div className={'searchBlock'}>
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

    useEffect(() => {

        const body = document.querySelector('body');

        const searchToggle = (e: MouseEvent) => {

            const target = e.target as HTMLElement;

            if (e.target) {
                if (!target.classList.contains('searchOption') && !target.classList.contains('searchOptionsBtn')) setOpen(false);
            }
        }

        if (body) body.addEventListener('click', searchToggle);

        return () => {
            if (body) body.removeEventListener('click', searchToggle);
        }

    }, [])

    const searchByMap = searchBy.map((i, idx) => <div key={idx} className={'searchOption'}
                                                      onClick={() => searchOptionHandler(i)}>{i}</div>);

    return (
        <form onSubmit={props.handleSubmit} id={'searchForm'}>
            <div className={'searchFieldGroup'}>
                <Field component={Input} type={'text'} name={`${searchParam}`}
                       placeholder={`search by ${searchParam}`}/>
                <div className={open ? 'searchOptions open' : 'searchOptions'}>
                    {searchByMap}
                </div>
            </div>
            <div className={open ? 'searchOptionsBtn open' : 'searchOptionsBtn'}
                 onClick={() => setOpen(prev => !prev)}></div>
            <button>Search</button>
        </form>
    )
};

const SearchReduxForm = reduxForm<SearchObject, PropsToReduxType>({form: 'SearchForm'})(SearchForm);