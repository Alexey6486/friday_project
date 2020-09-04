import React, {useCallback, useEffect, useState} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {
    changePageTC,
    changePortionTC,
    getPacksTC,
    PackStateType,
    setMinMaxAC,
    setPortionTC,
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
import {PacksLoading} from "../utils/loading/packsLoading/PacksLoading";
import {reset} from "redux-form";
import { SearchObject } from "../api/packsApi";
import { RangeSlider } from "../utils/rangeSlider/RangeSlider";

export const Packs = React.memo(() => {

    const dispatch = useDispatch();

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, sortBy, onlyMyPacks, currentPortion, isLoading, sortParam, sortMax, sortMin} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    // create/edit pop ups
    const [createPackPopUp, setCreatePackPopUp] = useState(false);
    const [editPackPopUp, setEditPackPopUp] = useState('');

    const toggleCreatePackPopUp = useCallback(() => {
        setCreatePackPopUp(prev => !prev);
    }, []);
    const toggleEditPackPopUp = useCallback((_id: string) => {
        setEditPackPopUp(_id);
    }, []);
    ///

    // sorting
    const sortRegular = useCallback((sortDirection: string) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;

        dispatch(sortTC({
            page: fromServer.page,
            pageCount: fromServer.pageCount,
            sortPacks: `${sortUrl}`,
            user_id: checkFlag,
            max: sortMax,
            min: sortMin
        }));
    }, [dispatch, onlyMyPacks, sortBy, fromServer.pageCount, fromServer.page, userProfile._id, sortMin, sortMax]);

    const sortCheck = useCallback(() => {
        const checkFlag = onlyMyPacks ? `` : `${userProfile._id}`;
        dispatch(showOnlyMyPacksTC({page: 1, pageCount: fromServer.pageCount, user_id: checkFlag, max: sortMax, min: sortMin}, !onlyMyPacks));
        dispatch(setPortionTC(1));
    }, [dispatch, onlyMyPacks, fromServer.pageCount, userProfile._id, sortMin, sortMax]);
    ///

    // pagination
    const onPageChange = useCallback((page: number) => {
        const user_id = onlyMyPacks ? `${userProfile._id}` : '';
        const pageCount = fromServer.pageCount;
        const sortPacks = sortParam;
        user_id ? dispatch(changePageTC({page, pageCount, sortPacks, user_id, max: sortMax, min: sortMin})) : dispatch(changePageTC({page, pageCount, sortPacks, max: sortMax, min: sortMin}));
    }, [dispatch, onlyMyPacks, fromServer.pageCount, userProfile._id, sortParam, sortMin, sortMax]);

    const onShowByChange = useCallback((pageCount: number) => {
        const checkFlag = onlyMyPacks ? `${userProfile._id}` : '';
        const page = fromServer.page;
        const user_id = checkFlag;
        const sortPacks = sortParam;
        dispatch(showByTC({page, pageCount, sortPacks, user_id, max: sortMax, min: sortMin}));
    }, [dispatch, onlyMyPacks, fromServer.page, userProfile._id, sortParam, sortMin, sortMax]);

    const onPortionChange = useCallback((flag: boolean) => {
        flag ? dispatch(changePortionTC(true)) : dispatch(changePortionTC(false));
    }, [dispatch]);

    const setPortionChange = useCallback((portion: number) => {
        dispatch(setPortionTC(portion));
    }, [dispatch]);
    ///

    //search
    const onSearchSubmit = (queryParam: SearchObject) => {
        if (queryParam.packName) {
            dispatch(getPacksTC({
                page: fromServer.page,
                pageCount: fromServer.pageCount,
                packName: queryParam.packName
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
    ///

    //range slider
    const searchByMinMax = (valArr: Array<number>) => {
        const user_id = onlyMyPacks ? `${userProfile._id}` : '';
        const sortPacks = sortParam;
        const min = valArr[0];
        const max = valArr[1];
        dispatch(setMinMaxAC(min, max));
        dispatch(getPacksTC({
            page: fromServer.page,
            pageCount: fromServer.pageCount,
            min,
            max,
            sortPacks,
            user_id,
        }));
    }
    ///

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getPacksTC({page, pageCount, sortParam}));
    }, []);

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

                    <Search searchBy={['packName']} onSearchSubmit={onSearchSubmit}/>

                    <RangeSlider max={fromServer.maxCardsCount} min={fromServer.minCardsCount} step={1}
                    fromVal={sortMin} toVal={sortMax} searchByMinMax={searchByMinMax}/>

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

                    {isLoading ? <PacksLoading/> : packsMap}

                </div>

                <Pagination currentPage={fromServer.page} itemsOnPage={fromServer.pageCount} onPageChange={onPageChange}
                            pagesInPortion={5} totalItems={fromServer.cardPacksTotalCount}
                            onShowByChange={onShowByChange} onPortionChange={onPortionChange}
                            currentPortion={currentPortion} setPortionChange={setPortionChange}/>

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