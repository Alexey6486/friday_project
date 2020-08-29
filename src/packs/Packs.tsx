import React, {useEffect} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {getPacksTC, PackStateType} from "../reducers/packsReducer/packsReducer";

export const Packs = () => {

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {cardPacks} = packsState;

    useEffect(() => {
        dispatch(getPacksTC({}));
    }, [dispatch])

    const packsMap = cardPacks.map(pack => {
        return (
            <div key={pack._id}>Pack name: {pack.name}</div>
        )
    });

    return (
        <div className={s.packs}>
            <div className={'container'}>
                Packs:
                {packsMap}
            </div>
        </div>
    )
}