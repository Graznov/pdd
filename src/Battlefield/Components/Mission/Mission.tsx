import classNames from 'classnames/bind';
import styles from './mission.module.css';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {quest} from "../../../store/interface.ts";
import {
    pushAnswerQuest,
    pushAnswerQuestERROR,
    setActiveQwestERRORPlus,
    setActiveQwestPlus
} from "../../../store/marafonSlice.ts";
import Star from '/src/assets/star.svg?react'
import Question from '/src/assets/question.svg?react'
import ErrorSVG from '/src/assets/error.svg?react'
import {examPushAnswerQuest, resetExam, setExamActiveQuestPlus, setSdal} from "../../../store/examSlice.ts";
import {pushError, pushSelectedQuestion, resetUserData} from "../../../store/userDataSlice.ts";
import {useNavigate} from "react-router-dom";
import logIn from "../../LogIn/LogIn.tsx";


const cx = classNames.bind(styles);

let number :number = 0

function Mission({title, answers, answer_tip, correct_answer, id, image, question, ticket_category, ticket_number, topic, response}: quest) {

    // console.log(response)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const UserData = useAppSelector(state => state.userDataSlice)

    const wind = useAppSelector(state => state.styleSlice.wind)
    const favorits = useAppSelector(state => state.userDataSlice.starQuestions)

    const examActiveQuest = useAppSelector(state => state.examSlice.examActiveQuest);
    const marafonActiveQuest = useAppSelector(state => state.marafonSlice.activeQuest);
    const errorActiveQuest = useAppSelector(state => state.marafonSlice.activeQuestError)

    const listExam = useAppSelector(state => state.examSlice.examList)
    const listMarafon = useAppSelector(state => state.marafonSlice.listQuests)
    const listError = useAppSelector(state => state.marafonSlice.listQuestionError)

    let list:quest[]
    let activeQwest:number

    if(wind==='exam'){
        list=listExam
        activeQwest = examActiveQuest
    } else if (wind==='marafon'){
        list=listMarafon
        activeQwest=marafonActiveQuest
    } else if (wind==='error'){
        list=listError
        activeQwest=errorActiveQuest
        console.log(list[activeQwest])
    }

    console.log(`wind: ${wind}`)

    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);


    useEffect(() => {
        number = red+green
            }, [red, green]);

    useEffect(() => {

    }, [number]);
    const pathToImg = image.substr(1)

    const [errorAnswerRed , setErrorAnswerRed] = useState(''); //окрас красным неверного ответа при работе над ошибками
    const [answerIndex, setAnswerIndex] = useState(-1);
    const [crashMission, setCrashMission] = useState(false);

    const handleAnswerClick = (index:number, isCorrect:boolean) => {

        // if(!isCorrect && wind!=='error') dispatch(pushError(id))

            if(UserData.entrance){

                // fetch(`http://localhost:3000/user/pusherror/${UserData.id}`, {
                //     method: 'PATCH', // Указываем метод запроса
                //     credentials: "include",
                //     headers: {
                //         'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                //         'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
                //     },
                //     body: JSON.stringify({id:id, correct: isCorrect, wind:wind})
                // })
                //     .then((response) => {
                //         if (!response.ok) {
                //
                //             if(response.status === 400){
                //                 // console.log('TOKENS ERROR')
                //                 console.log('TOKENS ERROR')
                //                 localStorage.removeItem('PDD_accessToken')
                //                 localStorage.removeItem('PDD_id')
                //                 dispatch(resetUserData())
                //                 // navigate('/login')
                //             }
                //             // alert('Что то пошло не так, попробуйте еще раз')
                //
                //             throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                //         }
                //         return response.json()
                //     })
                //
                //     .then((data) => {
                //         console.log('Данные получены', data)
                //         localStorage.setItem('PDD_accessToken', data.accessToken)
                //     })
                //     .catch((err) => {
                //
                //         console.log('Произошла ошибка', err.message, err.status)
                //
                //     })


                //DeepS
                fetch(`http://localhost:3000/user/pusherror/${UserData.id}`, {
                    method: 'PATCH',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('PDD_accessToken')!,
                    },
                    body: JSON.stringify({ id: id, correct: isCorrect, wind: wind })
                })
                    .then(async (response) => {
                        if (!response.ok) {
                            if (response.status === 400) {
                                console.log('TOKENS ERROR');
                                localStorage.removeItem('PDD_accessToken');
                                localStorage.removeItem('PDD_id');
                                dispatch(resetUserData());
                            }
                            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
                        }

                        // Проверяем, есть ли тело ответа
                        const text = await response.text();
                        return text ? JSON.parse(text) : null; // Парсим JSON только если есть данные
                    })
                    .then((data) => {
                        if (data && data.accessToken) {
                            console.log('Данные получены', data);
                            localStorage.setItem('PDD_accessToken', data.accessToken);
                        } else {
                            console.log('Бекенд вернул пустой ответ');
                        }
                    })
                    .catch((err) => {
                        console.log('Произошла ошибка:', err.message);
                        alert('Что то пошло не так, попробуйте еще раз')
                    });
                //DeepS

            }

        console.log(`red+green = ${red+green}`)

        console.log(
            'list[activeQwest].response:\n', list[activeQwest].response, '\n',
            'list[activeQwest].yourResponse: ', '\n', list[activeQwest].yourResponse, '\n',
            'index: ', '\n', index, '\n',
            'list[activeQwest].answers[index].is_correct:', '\n', list[activeQwest].answers[index].is_correct, '\n'
        )

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
        } else if (wind==='error'){
            console.log('ERROR')
            setAnswerIndex(index)
            if(isCorrect){
                setCrashMission(true)
                setErrorAnswerRed('green')
                // dispatch(pushError(id))
            } else {
                setErrorAnswerRed('red')
            }


            // dispatch(pushAnswerQuestERROR({isCorrect,index}))

            // console.log(listError[activeQwest])
        }

        console.log("%c" + `Mission.tsx\nisCorrect: ${isCorrect}\nlist[activeQuest]: ${list[activeQwest].yourResponse}`, "color:#559D4CFF;font-size:17px;");

        // if (number===20) return

        setTimeout(() => {
            if(wind==='exam'){

                dispatch(setExamActiveQuestPlus())
            } else if (wind==='marafon'){

                dispatch(setActiveQwestPlus())
            } else if (wind==='error'){

                // console.log(
                //     'list[activeQwest].response:\n', list[activeQwest].response, '\n',
                //     'list[activeQwest].yourResponse: ', '\n', list[activeQwest].yourResponse, '\n',
                //     'index: ', '\n', index, '\n',
                //     'list[activeQwest].answers[index].is_correct:', '\n', list[activeQwest].answers[index].is_correct, '\n'
                // )
                setCrashMission(false)

                setErrorAnswerRed('')
                setAnswerIndex(-1)
                if(!isCorrect){
                    console.log('ERRROR_PLUS')
                    dispatch(setActiveQwestERRORPlus())
                } else {
                    dispatch(pushError(id))


                }
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


    const pushStar = () => {
        // console.log('Push_Star')
        dispatch(pushSelectedQuestion(id))

        if(UserData.entrance){
            fetch(`http://localhost:3000/user/redactstar/${UserData.id}`, {
                method: 'PATCH', // Указываем метод запроса
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                    'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
                },
                body: JSON.stringify({id:id})
            })
                .then((response) => {

                    console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");

                    if (!response.ok) {
                        console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");

                        if(response.status === 400){
                            console.log('TOKENS ERROR')
                            localStorage.removeItem('PDD_accessToken')
                            localStorage.removeItem('PDD_id')
                            dispatch(resetUserData())
                        }
                        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                    }

                    // console.log(response.status)

                    return response.json()
                })

                .then((data) => {
                    console.log('Данные получены', data)
                    localStorage.setItem('PDD_accessToken', data.accessToken)
                })
                .catch((err) => {
                    alert('Что то пошло не так, попробуйте еще раз')
                    console.log('Произошла ошибка', err.message, err.status)
                })

        }

    }

    console.log(`Mission`)

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
                    'mission_hidden' : crashMission
                })}>


                <div className={cx('mission_title')}>
                    <div className={cx('mission_title-error',{
                        'mission_title-error-visible':UserData.errorQuestions.includes(id)
                    })}>
                        <ErrorSVG/>
                    </div>
                    <div className={cx('mission_title_ticketNumber')}>
                        {ticket_number}
                    </div>
                    {title}

                    {
                        (UserData.entrance) ? (
                            <button
                                className={cx('mission_selected', {
                                    'mission_selected_actice': favorits.includes(id)
                                })}
                                onClick={pushStar}>
                                <Star/>
                            </button>
                        ) : ''
                    }

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

                                    'answer_Btn_Green': list[activeQwest].response && list[activeQwest].answers[index].is_correct ||
                                        wind==='error' && list[activeQwest].answers[index].is_correct && errorAnswerRed === 'green',
                                    'answer_Btn_Red': list[activeQwest].response && list[activeQwest].yourResponse === index && !list[activeQwest].answers[index].is_correct ||
                                        wind==='error' && !list[activeQwest].answers[index].is_correct && answerIndex===index && errorAnswerRed === 'red',

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