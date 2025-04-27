import classNames from 'classnames/bind';
import styles from './mission.module.css';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {quest} from "../../../store/interface.ts";
import {pushAnswerQuest, setActiveQwestPlus} from "../../../store/marafonSlice.ts";
import Star from '/src/assets/star.svg?react'
import Question from '/src/assets/question.svg?react'
import {examPushAnswerQuest, resetExam, setExamActiveQuestPlus, setSdal} from "../../../store/examSlice.ts";
import {pushError, pushSelectedQuestion} from "../../../store/userDataSlice.ts";
import {useNavigate} from "react-router-dom";


const cx = classNames.bind(styles);

let number :number = 0


function Mission({title, answers, answer_tip, correct_answer, id, image, question, ticket_category, ticket_number, topic, response}: quest) {

    // console.log(response)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const wind = useAppSelector(state => state.styleSlice.wind)
    const favorits = useAppSelector(state => state.userDataSlice.selectedQuestions)
    const examActiveQuest = useAppSelector(state => state.examSlice.examActiveQuest);
    const marafonActiveQuest = useAppSelector(state => state.marafonSlice.activeQuest);
    const activeQwest = (wind === 'exam') ? examActiveQuest : marafonActiveQuest;

    const listExam = useAppSelector(state => state.examSlice.examList)
    const listMarafon = useAppSelector(state => state.marafonSlice.listQuests)
    const list = (wind==='exam')?listExam:listMarafon

    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);

    // const sdal = useAppSelector(state => state.examSlice.sdal)

    // const neSdal = useAppSelector(state => state.examSlice.neSdal)

    // const activeQwest = useAppSelector(state => state.marafonSlice.activeQuest)
    // const activeQwest = (wind==='exam')?useAppSelector(state => state.examSlice.examActiveQuest):useAppSelector(state => state.marafonSlice.activeQuest);


    // const list = useAppSelector(state => state.marafonSlice.listQuests);
    // const list = (wind==='exam')?useAppSelector(state => state.examSlice.examList):useAppSelector(state => state.marafonSlice.listQuests);

    // let number :number

    useEffect(() => {
        number = red+green

        // if(red+green===20) navigate('/')
        console.log("%c" +`red+green=${red+green}\nred = ${red}\ngreen = ${green}\nnumber = ${number}` , "color:#559D4CFF;font-size:17px;")

    }, [red, green]);

    useEffect(() => {

    }, [number]);
    const pathToImg = image.substr(1)

    console.log("%c" + `Mission.tsx\nactiveQwest: ${activeQwest}\nresponse: ${response}\nticket_number: ${ticket_number}\ntitle: ${title}`, "color:#559D4CFF;font-size:17px;");



    const handleAnswerClick = (index:number, isCorrect:boolean) => {

        if(!isCorrect)dispatch(pushError(id))

        // console.log(`number = ${number}`)
        console.log(`red+green = ${red+green}`)


        if(wind==='exam'){
            if(red+green+1===20 && red<3) {
                console.log('CONGRAT...')
                dispatch(examPushAnswerQuest({isCorrect,index}))
                dispatch(setSdal(true))
                return
            } else if (red+green+1===20){
                setTimeout(()=>{
                    dispatch(resetExam())
                    navigate('/examticket')
                },1000)
            }
            dispatch(examPushAnswerQuest({isCorrect,index}))
        } else if (wind==='marafon'){
            dispatch(pushAnswerQuest({isCorrect,index}))
        }

        console.log("%c" + `Mission.tsx\nisCorrect: ${isCorrect}\nlist[activeQuest]: ${list[activeQwest].yourResponse}`, "color:#559D4CFF;font-size:17px;");

        // if (number===20) return

        setTimeout(() => {
            if(wind==='exam'){
                dispatch(setExamActiveQuestPlus())
            } else if (wind==='marafon'){
                dispatch(setActiveQwestPlus())
            }
        }, 1000);

    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                console.log('Esc pressed!');
                // Ваш код при нажатии Esc (закрытие модалки, меню и т.д.)
                setResponseWind(false)
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [responseWind, setResponseWind] = useState(false);

    return (

        <>
            <div
                className={cx('mission_responseWind', {
                    'mission_responseWind_visible': responseWind
                })}
                onClick={() => setResponseWind(false)}>
                <div className={cx('mission_responseWind_topic')}>
                    <div>{ticket_category}</div>
                    <div>{topic}</div>
                    {/*<div>{id}</div>*/}
                </div>
                <div className={cx('mission_responseWind_tip')}>{answer_tip}</div>
                <div className={cx('mission_responseWind_correct')}>{correct_answer}</div>
            </div>

            <div
                className={cx('mission', {
                    'mission_inposible': response || responseWind,
                })}>


                <div className={cx('mission_title')}>
                    <div className={cx('mission_title_ticketNumber')}>
                        {ticket_number}
                    </div>
                    {title}
                    <button
                        className={cx('mission_selected',{
                            'mission_selected_actice' : favorits.includes(id)
                        })}
                        onClick={()=>dispatch(pushSelectedQuestion(id))}>
                        <Star/>
                    </button>
                    <button
                        className={cx('mission_img_text')}
                        onClick={() => {
                            setResponseWind(true)
                        }}>
                        <Question/>
                    </button>
                </div>

                <div className={cx('mission_img')}>
                    <img
                        src={`/pdd_russia${pathToImg}`}
                        alt={`pdd_russia${pathToImg}`}/>
                </div>


                <div className={cx('mission_question')}>{question}</div>

                <div className={cx('mission_answerArea')}>
                    {
                        answers.map((answer, index: number) => (
                            <button
                                disabled={list[activeQwest].response}
                                className={cx(`answer_Btn_${index}`, {

                                    'answer_Btn_Green': list[activeQwest].response && list[activeQwest].answers[index].is_correct,
                                    'answer_Btn_Red': list[activeQwest].response && list[activeQwest].yourResponse === index && !list[activeQwest].answers[index].is_correct,

                                })}
                                key={answer.answer_text}
                                onClick={() => handleAnswerClick(index, answer.is_correct)
                                }>
                                {answer.answer_text}
                            </button>
                        ))
                    }
                </div>

            </div>
        </>

    )
}

export default Mission;