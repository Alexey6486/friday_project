import React, {useEffect, useState} from "react";
import './Learn.styles.scss';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {CardsStateType, getCardsTC, packIdAC} from "../reducers/cardsReducer/cardsReducer";
import {GradeStateType, learnTC} from "../reducers/learnReducer/learnReducer";

type CardsPackIdType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<CardsPackIdType>;
type CardDataType = {
    _id: string
    question: string
    answer: string
    grade: number
}

const LearnComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const gradeState = useSelector<AppRootStateType, GradeStateType>(state => state.gradeReducer);
    const {isLoading} = gradeState;

    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {cards} = cardsState.fromCardsServer;

    const {match} = props;

    const cardsPack_id = match.params.cardsPack_id;

    const cardsMap = cards.map(card => {
        const {_id, question, answer} = card;
        const grade: number = +card.grade.toFixed(1);
        return (
            {_id, question, answer, grade}
        )
    });

    const foo = (arr: Array<CardDataType>) => {
        const newArr: Array<CardDataType> = [];

        arr.forEach(el => {
            let entriesAmount = Math.pow((Math.ceil(6 - el.grade)), 2);
            for (let i = 0; i < entriesAmount; i++) {
                newArr.push(el);
            }
        });

        const cardInx = Math.floor(Math.random() * (newArr.length));

        return newArr[cardInx]
    }

    const [card, setCard] = useState<CardDataType>({_id: '', question: '', answer: '', grade: 0});
    const [showAnswer, setShowAnswer] = useState(false);

    const onClickNext = () => {
        const nextCard = foo(cardsMap);
        setShowAnswer(false);
        setCard(nextCard);
        dispatch(getCardsTC());
    }

    const gradeQuestion = (grade: number, card_id: string) => {
        const gradeParam = {grade, card_id}
        dispatch(learnTC(gradeParam));
    }

    const disableBtn = isLoading ? 'gradeBtn disabled' : 'gradeBtn';

    useEffect(() => {
        dispatch(packIdAC(cardsPack_id));
        dispatch(getCardsTC());
        setCard(foo(cardsMap));
    }, [dispatch])

    return (
        <div className={'learn'}>
            <div className={'container'}>

                <div className={'question'}>
                    <div className={'question__title'}>Question:</div>
                    <div className={'question__text'}>{card && card.question}</div>
                    <div className={'question__grade'}>Current grade: {card && card.grade}</div>
                    {!showAnswer && <button onClick={() => setShowAnswer(true)}>show answer</button>}
                </div>


                {
                    showAnswer &&
                    <div className={'answer'}>
                        <div className={'answer__title'}>Answer:</div>
                        <div className={'answer__text'}>{card && card.answer}</div>
                        <div className={'answer__btnBlock'}>
                            <button className={disableBtn} onClick={() => {gradeQuestion(1, card?._id)}}>wrong</button>
                            <button className={disableBtn} onClick={() => {gradeQuestion(2, card?._id)}}>bad</button>
                            <button className={disableBtn} onClick={() => {gradeQuestion(3, card?._id)}}>close</button>
                            <button className={disableBtn} onClick={() => {gradeQuestion(4, card?._id)}}>almost</button>
                            <button className={disableBtn} onClick={() => {gradeQuestion(5, card?._id)}}>correct</button>
                        </div>
                        <button className={`${disableBtn} nextBtn`} onClick={onClickNext}>next</button>
                    </div>
                }
            </div>
        </div>
    )
}

export const Learn = withRouter(LearnComponent);