import classNames from 'classnames/bind';
import styles from './examArea.module.css';
import Mission from "../../Components/Mission/Mission.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {resetExam, setExamActiveQuest, setExamActiveQuestPlus, setNeSdal} from "../../../store/examSlice.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Winer from '/src/assets/win.svg?react'


const cx = classNames.bind(styles);

function ExamArea(){

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const wind = useAppSelector(state => state.styleSlice.wind)
    const examActiveQuest = useAppSelector(state => state.examSlice.examActiveQuest)
    const examList = useAppSelector(state => state.examSlice.examList);
    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);
    const neSdal = useAppSelector(state => state.examSlice.neSdal)
    const sdal = useAppSelector(state => state.examSlice.sdal)


    useEffect(() => {
        if(red===3)dispatch(setNeSdal(true))
    }, [red, green]);

    if (examList.length === 0) return null;
    console.log(examList)

    return (

        <>

            <div className={cx('exam-congratulate', {
                'exam-congratulate-visible':sdal
            })}>
                <div className={cx('exam-congratulate_Logo')}>
                    <Winer/>
                </div>

                <div>
                    <NavLink
                        onClick={()=>dispatch(resetExam())}
                        to={'/'}
                    >
                        Вернуться
                    </NavLink>
                </div>
            </div>

            <div className={cx('exam-nesdal', {
                'exam-nesdal--visible': neSdal
            })}>
                <div className={cx('exam-nesdal_inner')}>
                    <div className="exam-nesdal_inner_text">
                        НЕ СДАЛ
                    </div>

                    <div className={cx('exam-nesdal_inner_BtnArea')}>
                        <button onClick={()=> {
                            dispatch(setNeSdal(false))
                            dispatch(setExamActiveQuestPlus())
                        }}>Продолжить</button>
                        <button onClick={()=>{
                            dispatch(resetExam())
                            navigate('/examticket')
                        }}>Закончить</button>
                    </div>
                </div>
            </div>

            <div className={cx('exam',{
                'exam_deactive': neSdal
            })}>


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

                    <Mission
                        yourResponse={examList[examActiveQuest].yourResponse}
                        status={examList[examActiveQuest].status}
                        number={examList[examActiveQuest].number}
                        response={examList[examActiveQuest].response}
                        ticket_category={examList[examActiveQuest].ticket_category}
                        ticket_number={examList[examActiveQuest].ticket_number}
                        title={(wind === 'marafon') ? `Вопрос ${examActiveQuest + 1}` : `${examList[examActiveQuest].title}`}
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
        </>

    )
}

export default ExamArea;