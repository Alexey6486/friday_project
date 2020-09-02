import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import s from './Cards.module.scss';
import {AppRootStateType} from "../store/store";
import {
    CardsStateType,
    changePageTC,
    changePortionTC,
    getCardsTC,
    setCurrentPageAC,
    setPortionTC,
    showByTC,
    sortCardsTC
} from "../reducers/cardsReducer/cardsReducer";
import {Search} from "../utils/search/Search";
import {Sorting} from "../utils/sorting/Sorting";
import {Card} from "./card/Card";
import {Pagination} from "../utils/pagination/Pagination";
import {PackStateType} from "../reducers/packsReducer/packsReducer";
import {AuthStateType} from "../reducers/authReducers/loginReducer";
import {AddCard} from "./addCard/AddCard";
import {PacksLoading} from "../utils/loading/packsLoading/PacksLoading";
import {EditCard} from "./editCard/EditCard";
import {reset} from "redux-form";
import {SearchObject} from "../api/packsApi";

type CardsPackIdType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<CardsPackIdType>;

const CardsComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {fromCardsServer, currentPortion, isLoading, sortBy, sortParam} = cardsState;

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);

    const {match} = props;

    const cardsPack_id = match.params.cardsPack_id;

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

    // pagination
    const onPageChange = useCallback((page: number) => {
        const pageCount = fromCardsServer.pageCount;
        const sortCards = sortParam;
        dispatch(changePageTC({page, pageCount, sortCards, cardsPack_id}))
    }, [dispatch, fromCardsServer.pageCount, sortParam]);

    const onShowByChange = useCallback((pageCount: number) => {
        const page = fromCardsServer.page;
        const sortCards = sortParam;
        dispatch(showByTC({page, pageCount, sortCards, cardsPack_id}));
    }, [dispatch, fromCardsServer.page, sortParam]);

    const onPortionChange = useCallback((flag: boolean) => {
        flag ? dispatch(changePortionTC(true)) : dispatch(changePortionTC(false));
    }, [dispatch]);

    const setPortionChange = useCallback((portion: number) => {
        dispatch(setPortionTC(portion));
    }, [dispatch]);
    ///

    // sorting
    const sortRegular = useCallback((sortDirection: string) => {
        const sortUrl = sortBy ? `1${sortDirection}` : `0${sortDirection}`;
        dispatch(sortCardsTC({
            page: fromCardsServer.page,
            pageCount: fromCardsServer.pageCount,
            sortCards: `${sortUrl}`,
            cardsPack_id
        }));
    }, [dispatch, sortBy, fromCardsServer.pageCount, fromCardsServer.page]);
    ///

    //search
    const onSearchSubmit = (queryParam: SearchObject) => {

        if (queryParam.cardAnswer) {
            dispatch(getCardsTC({
                page: fromCardsServer.page,
                pageCount: fromCardsServer.pageCount,
                cardAnswer: queryParam.cardAnswer,
                cardsPack_id
            }))
            dispatch(reset('SearchForm'));
        } else if (queryParam.cardQuestion) {
            dispatch(getCardsTC({
                page: fromCardsServer.page,
                pageCount: fromCardsServer.pageCount,
                cardQuestion: queryParam.cardQuestion,
                cardsPack_id
            }))
            dispatch(reset('SearchForm'));
        } else {
            dispatch(getCardsTC({
                page: fromCardsServer.page,
                pageCount: fromCardsServer.pageCount,
                cardsPack_id
            }))
            dispatch(reset('SearchForm'));
        }
    }
    ///

    useEffect(() => {
        const page = fromCardsServer.page;
        const pageCount = fromCardsServer.pageCount;
        dispatch(getCardsTC({cardsPack_id, page, pageCount}))

        return () => {
            dispatch(setPortionTC(1))
            dispatch(setCurrentPageAC(1))
        }
    }, [])

    const sortArray = ['answer', 'question'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort} sortRegular={sortRegular}/>);

    const checkIfPackIsYours = packsState.fromServer.cardPacks.filter(f => {
        if (f._id === cardsPack_id && f.user_id === userProfile._id) {
            return f
        }
    });

    const cardsMap = fromCardsServer.cards.map(card => {
        const {_id, question, answer, created} = card;
        return (
            <Card key={_id} question={question} answer={answer} created={created}
                  checkIfPackIsYours={checkIfPackIsYours.length} toggleEditPackPopUp={toggleEditPackPopUp} id={_id}
                  cardsPack_id={cardsPack_id}/>
        )
    })

    const isPackEmpty = cardsMap.length < 1 ? <div>There are no cards yet here.</div> : cardsMap;

    return (
        <div className={s.cards}>
            <div className={'container'}>

                <div className={s.cards__interface}>

                    <button className={s.cards__btn} onClick={toggleCreatePackPopUp}>add new card</button>

                    <Search searchBy={['cardQuestion', 'cardAnswer']} onSearchSubmit={onSearchSubmit}/>

                    <div className={s.cards__sortBlock}>
                        <div className={s.cards__sortTitle}>Sort by:</div>
                        <div className={s.cards__sortBtns}>{sortMap}</div>
                    </div>

                </div>

                <div className={s.cardsTable}>

                    <div className={s.cardsTable__header}>
                        <div>Card question</div>
                        <div>Card answer</div>
                        <div>Created</div>
                    </div>

                    {isLoading ? <PacksLoading/> : isPackEmpty}

                </div>

                <Pagination currentPage={fromCardsServer.page} itemsOnPage={fromCardsServer.pageCount}
                            onPageChange={onPageChange}
                            pagesInPortion={5} totalItems={fromCardsServer.cardsTotalCount}
                            onShowByChange={onShowByChange} onPortionChange={onPortionChange}
                            currentPortion={currentPortion} setPortionChange={setPortionChange}/>

            </div>

            {
                createPackPopUp &&
                <AddCard toggleCreatePackPopUp={toggleCreatePackPopUp} cardsPack_id={cardsPack_id}/>
            }
            {
                editPackPopUp &&
                <EditCard toggleEditPackPopUp={toggleEditPackPopUp} id={editPackPopUp} cardsPack_id={cardsPack_id}/>
            }

        </div>
    )
}

export const Cards = withRouter(CardsComponent);