import React from "react";
import s from './Sorting.module.scss';
import {getPacksTC, PackStateType, sortTC} from "../../reducers/packsReducer/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

type PropsType = {
    sortDirection: string
}

export const Sorting = (props: PropsType) => {

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);

    const {fromServer, sortBy} = packsState;
    const {sortDirection} = props;

    const sort = () => {
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        dispatch(getPacksTC({page: fromServer.page, pageCount: fromServer.pageCount, sortPacks: `${sortUrl}`}));
        dispatch(sortTC());
    };

    return (
        <button className={s.sortBtn} onClick={sort}>{sortDirection}</button>
    )
}