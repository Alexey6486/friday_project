import React, {useEffect} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {getPacksTC, PackStateType} from "../reducers/packsReducer/packsReducer";
import {Sorting} from "../utils/sorting/Sorting";
import { Pack } from "./pack/Pack";

export const Packs = () => {

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer} = packsState;

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getPacksTC({page, pageCount}));
    }, [dispatch]);


    const packsMap = fromServer.cardPacks.map(pack => <Pack key={pack._id} {...pack}/>);

    const sortArray = ['name', 'cardsCount', 'updated', 'created'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort}/>);

    return (
        <div className={s.packs}>
            <div className={'container'}>
                Packs:
                {sortMap}
                {packsMap}
            </div>
        </div>
    )
}