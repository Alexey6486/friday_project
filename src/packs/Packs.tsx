import React, {useEffect, useState} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {getPacksTC, PackStateType, showOnlyMyPacksTC, sortTC} from "../reducers/packsReducer/packsReducer";
import {Sorting} from "../utils/sorting/Sorting";
import {Pack} from "./pack/Pack";
import {AddPack} from "./addPack/AddPack";
import { EditPack } from "./editPack/EditPack";
import {AuthStateType} from "../reducers/authReducers/loginReducer";

export const Packs = () => {

    const dispatch = useDispatch();

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, sortBy, onlyMyPacks} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const [createPackPopUp, setCreatePackPopUp] = useState(false);
    const [editPackPopUp, setEditPackPopUp] = useState('');

    const toggleCreatePackPopUp = () => {
        setCreatePackPopUp(prev => !prev);
    }
    const toggleEditPackPopUp = (_id: string) => {
        setEditPackPopUp(_id);
    }

    const sortRegular = (sortDirection: string) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        debugger
        dispatch(sortTC({
            page: fromServer.page,
            pageCount: fromServer.pageCount,
            sortPacks: `${sortUrl}`,
            user_id: checkFlag
        }));
    };

    const sortCheck = async () => {
        const checkFlag = onlyMyPacks ? `` : `${userProfile._id}`;
        dispatch(showOnlyMyPacksTC({
            page: fromServer.page,
            pageCount: fromServer.pageCount,
            user_id: checkFlag
        }, !onlyMyPacks));
    };

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getPacksTC({page, pageCount}));
    }, [dispatch]);

    const packsMap = fromServer.cardPacks.map(pack => <Pack key={pack._id} {...pack} toggleEditPackPopUp={toggleEditPackPopUp}/>);

    const sortArray = ['name', 'cardsCount', 'created', 'user_id'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort} onlyMyPacks={onlyMyPacks} sortCheck={sortCheck} sortRegular={sortRegular}/>);

    return (
        <div className={s.packs}>
            <div className={'container'}>

                <div className={s.packs__interface}>

                    <button className={s.packs__btn} onClick={toggleCreatePackPopUp}>add new pack</button>

                    <div className={s.packs__sortBlock}>
                        <div className={s.packs__sortTitle}>Sort by:</div>
                        <div className={s.packs__sortBtns}>{sortMap}</div>
                    </div>

                </div>

                <div className={s.packsTable}>

                    <div className={s.packsTable__header}>
                        <div>Pack name</div>
                        <div>Cards</div>
                        <div>Created</div>
                    </div>

                    {packsMap}

                </div>

            </div>

            {
                createPackPopUp &&
                <AddPack toggleCreatePackPopUp={toggleCreatePackPopUp}/>
            }
            {
                editPackPopUp &&
                <EditPack toggleEditPackPopUp={toggleEditPackPopUp} id={editPackPopUp}/>
            }
        </div>
    )
}