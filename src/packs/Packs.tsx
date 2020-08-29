import React, {useEffect} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {getPacksTC, PackStateType, sortTC} from "../reducers/packsReducer/packsReducer";

export const Packs = () => {

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, sortBy} = packsState;

    useEffect(() => {
        dispatch(getPacksTC({}));
    }, [dispatch])

    const sort = (sortDirection: string) => {
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        dispatch(getPacksTC({sortPacks: `${sortUrl}`}));
        dispatch(sortTC());
    };

    const packsMap = fromServer.cardPacks.map(pack => {
        return (
            <div key={pack._id} className={s.pack}>
                <div>Pack name: {pack.name}</div>
                <div>Cards count: {pack.cardsCount}</div>
                <div>Updated: {pack.updated}</div>
                <div>Created: {pack.created}</div>
            </div>
        )
    });

    return (
        <div className={s.packs}>
            <div className={'container'}>
                Packs:
                <button onClick={() => sort('name')}>sort by name</button>
                <button onClick={() => sort('cardsCount')}>sort by cardsCount</button>
                <button onClick={() => sort('updated')}>sort by updated</button>
                <button onClick={() => sort('created')}>sort by created</button>
                {packsMap}
            </div>
        </div>
    )
}