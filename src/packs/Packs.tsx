import React, {useCallback, useEffect, useState} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {
    changePageTC,
    getPacksTC,
    PackStateType,
    showByTC,
    showOnlyMyPacksTC,
    sortTC
} from "../reducers/packsReducer/packsReducer";
import {Sorting} from "../utils/sorting/Sorting";
import {Pack} from "./pack/Pack";
import {AddPack} from "./addPack/AddPack";
import {EditPack} from "./editPack/EditPack";
import {AuthStateType} from "../reducers/authReducers/loginReducer";
import {Search} from "../utils/search/Search";
import {Pagination} from "../utils/pagination/Pagination";

export const Packs = React.memo(() => {

    const dispatch = useDispatch();

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, sortBy, onlyMyPacks} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const [createPackPopUp, setCreatePackPopUp] = useState(false);
    const [editPackPopUp, setEditPackPopUp] = useState('');

    const toggleCreatePackPopUp = useCallback(() => {
        setCreatePackPopUp(prev => !prev);
    }, [])
    const toggleEditPackPopUp = useCallback((_id: string) => {
        setEditPackPopUp(_id);
    }, [])

    const sortRegular = useCallback((sortDirection: string) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        debugger
        dispatch(sortTC({
            page: fromServer.page,
            pageCount: fromServer.pageCount,
            sortPacks: `${sortUrl}`,
            user_id: checkFlag
        }));
    }, [dispatch, onlyMyPacks, sortBy, fromServer.pageCount, fromServer.page]);

    const sortCheck = useCallback(() => {
        const checkFlag = onlyMyPacks ? `` : `${userProfile._id}`;
        dispatch(showOnlyMyPacksTC({
            page: 1,
            pageCount: fromServer.pageCount,
            user_id: checkFlag
        }, !onlyMyPacks));
    }, [dispatch, onlyMyPacks, fromServer.pageCount, fromServer.page]);

    const onPageChange = useCallback((page: number) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const pageCount = fromServer.pageCount;
        const user_id = checkFlag;
        dispatch(changePageTC({page, pageCount, user_id}));
    }, [dispatch, onlyMyPacks, fromServer.pageCount, fromServer.page])

    const onShowByChange = useCallback((pageCount: number) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const page = fromServer.page;
        const user_id = checkFlag;
        dispatch(showByTC({page, pageCount, user_id}));
    }, [onlyMyPacks, fromServer.page])

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getPacksTC({page, pageCount}));
    }, [dispatch]);

    const packsMap = fromServer.cardPacks.map(pack => <Pack key={pack._id} {...pack}
                                                            toggleEditPackPopUp={toggleEditPackPopUp}/>);

    const sortArray = ['name', 'cardsCount', 'created', 'user_id'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort} onlyMyPacks={onlyMyPacks}
                                                          sortCheck={sortCheck} sortRegular={sortRegular}/>);

    return (
        <div className={s.packs}>
            <div className={'container'}>

                <div className={s.packs__interface}>

                    <button className={s.packs__btn} onClick={toggleCreatePackPopUp}>add new pack</button>

                    <Search/>

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

                <Pagination currentPage={fromServer.page} itemsOnPage={fromServer.pageCount} onPageChange={onPageChange}
                            pagesInPortion={5} totalItems={fromServer.cardPacksTotalCount} onShowByChange={onShowByChange}/>

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
})