import classNames from 'classnames/bind';
import styles from './examArea.module.css';
import Mission from "../../Components/Mission/Mission.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
// import {useAppDispatch, useAppSelector} from "/src/store/hooks.ts";
// import {useState} from "react";
// import {props_mission, quest} from "../../store/interface.ts";
import {setExamActiveQuest} from "../../../store/examSlice.ts";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

function ExamArea(){

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const wind = useAppSelector(state => state.styleSlice.wind)

    const examActiveQuest = useAppSelector(state => state.examSlice.examActiveQuest)
    const examList = useAppSelector(state => state.examSlice.examList);
    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);

    if(examList.length===0) return null;
    console.log(examList)

    // const [examActiveQuest, setExamActiveQuest] = useState('')
    // const [ticketsAreaBtn, setTicketsAreaBtn] = useState(false);

    return(
        <div className={cx('exam')}>

            {/*<div className={cx('exam-nesdal',{*/}
            {/*    'exam-nesdal--visible': red===3*/}
            {/*})}>*/}
            {/*    НЕ СДАЛ*/}
            {/*</div>*/}


            <div className={cx('all_questions')}>

                <div className={cx('all_questions_numbers')}>

                    {
                        examList.map((e) => (
                            <button
                                key={e.number}
                                className={cx('all_questions_numbers_qwest', {
                                    'all_questions_numbers_qwest_red': e.status === 'red',
                                    'all_questions_numbers_qwest_green': e.status === 'green',
                                    'all_questions_numbers_qwest_yellow': e.number === examActiveQuest,
                                })}
                                onClick={() => {
                                    dispatch(dispatch(setExamActiveQuest(e.number)))
                                }}>
                                {e.number + 1}
                            </button>
                        ))
                    }

                </div>

                {/*<div className={cx('all_questions_counter')}>*/}
                {/*    <div className={cx('all_questions_counter_red')}>{red}</div>*/}
                {/*    <div className={cx('all_questions_counter_slash')}>*/}
                {/*        /!*<Slash/>*!//*/}
                {/*    </div>*/}
                {/*    <div className={cx('all_questions_counter_green')}>{green}</div>*/}
                {/*</div>*/}

                <Mission
                    yourResponse={examList[examActiveQuest].yourResponse}
                    status={examList[examActiveQuest].status}
                    number={examList[examActiveQuest].number}
                    response={examList[examActiveQuest].response}
                    ticket_category={examList[examActiveQuest].ticket_category}
                    ticket_number={examList[examActiveQuest].ticket_number}
                    title={(wind==='marafon')?`Вопрос ${examActiveQuest + 1}`:`${examList[examActiveQuest].title}`}
                    image={examList[examActiveQuest].image}
                    question={examList[examActiveQuest].question}
                    answers={examList[examActiveQuest].answers}
                    correct_answer={examList[examActiveQuest].correct_answer}
                    answer_tip={examList[examActiveQuest].answer_tip}
                    topic={examList[examActiveQuest].topic}
                    id={examList[examActiveQuest].id}
                />

            </div>
        </div>
    )
}

export default ExamArea;