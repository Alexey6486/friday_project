import React, {useCallback, useEffect, useState} from "react";
import s from './Packs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {
    changePageTC,
    changePortionTC,
    deletePackTC,
    getPacksTC,
    PackStateType,
    searchPacksAC,
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
import {SearchObject} from "../api/packsApi";
import {RangeSlider} from "../utils/rangeSlider/RangeSlider";
import {Redirect} from "react-router-dom";
import {DeletePack} from "./deletePack/DeletePack";

export const Packs = React.memo(() => {

    const dispatch = useDispatch();

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer, sortBy, onlyMyPacks, currentPortion, isLoading, sortMax, sortMin} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth} = authState;

    // create/edit/delete pop ups
    const [createPackPopUp, setCreatePackPopUp] = useState(false);
    const [editPackPopUp, setEditPackPopUp] = useState<Array<string>>([]);
    const [deletePackPopUp, setDeletePackPopUp] = useState('');

    const toggleCreatePackPopUp = useCallback(() => {
        setCreatePackPopUp(prev => !prev);
    }, []);
    const toggleEditPackPopUp = useCallback((_id: string, args: Array<string>) => {
        if (_id) {
            setEditPackPopUp([_id, ...args]);
        } else {
            setEditPackPopUp([]);
        }
    }, []);
    const toggleDeletePackPopUp = useCallback((id: string) => {
        setDeletePackPopUp(id);
    }, []);
    ///

    // sorting
    const sortRegular = useCallback((sortDirection: string) => {
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        dispatch(sortTC(sortUrl));
    }, [dispatch, sortBy]);

    const sortCheck = useCallback(() => {
        dispatch(showOnlyMyPacksTC(!onlyMyPacks, 1));
        dispatch(setPortionTC(1));
    }, [dispatch, onlyMyPacks]);
    ///

    // pagination
    const onPageChange = useCallback((page: number) => {
        dispatch(changePageTC(page));
    }, [dispatch]);

    const onShowByChange = useCallback((pageCount: number) => {
        dispatch(showByTC(pageCount));
    }, [dispatch]);

    const onPortionChange = useCallback((flag: boolean) => {
        flag ? dispatch(changePortionTC(true)) : dispatch(changePortionTC(false));
    }, [dispatch]);

    const setPortionChange = useCallback((portion: number) => {
        dispatch(setPortionTC(portion));
    }, [dispatch]);
    ///

    // search
    const onSearchSubmit = (queryParam: SearchObject) => {
        if (queryParam.packName) {
            dispatch(searchPacksAC(queryParam.packName));
            dispatch(getPacksTC());
            dispatch(reset('SearchForm'));
        } else {
            dispatch(searchPacksAC(''));
            dispatch(getPacksTC());
            dispatch(reset('SearchForm'));
        }
    }
    ///

    // range slider
    const searchByMinMax = (valArr: Array<number>) => {
        dispatch(setMinMaxAC(valArr[0], valArr[1]));
        dispatch(getPacksTC());
    }
    ///

    // delete pack
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id));
    }
    ///

    useEffect(() => {
        dispatch(getPacksTC());
    }, []);

    const packsMap = fromServer.cardPacks
        .map(pack => <Pack key={pack._id} {...pack} toggleEditPackPopUp={toggleEditPackPopUp}
                                                    toggleDeletePackPopUp={toggleDeletePackPopUp}/>);

    const sortArray = ['name', 'cardsCount', 'created', 'user_id'];
    const sortMap = sortArray
        .map((sort, idx) => <Sorting key={idx} sortDirection={sort} onlyMyPacks={onlyMyPacks}
                                                          sortCheck={sortCheck} sortRegular={sortRegular}/>);

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

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
                editPackPopUp[0] &&
                <EditPack toggleEditPackPopUp={toggleEditPackPopUp} id={editPackPopUp[0]} name={editPackPopUp[1]}/>
            }
            {
                deletePackPopUp &&
                <DeletePack toggleDeletePackPopUp={toggleDeletePackPopUp} deletePack={deletePack} id={deletePackPopUp}/>
            }
        </div>
    )
})