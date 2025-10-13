import classNames from 'classnames/bind';
import styles from './mission.module.css';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {quest} from "../../../store/interface.ts";
import {
    pushAnswerQuest,
    pushAnswerQuestERROR, setActiveQwest,
    setActiveQwestERRORPlus,
    setActiveQwestPlus
} from "../../../store/marafonSlice.ts";
import Star from '/src/assets/star.svg?react'
import Question from '/src/assets/question.svg?react'
import ErrorSVG from '/src/assets/error.svg?react'
import {
    examPushAnswerQuest,
    resetExam, setExamActiveQuest,
    setExamActiveQuestPlus,
    setGreen,
    setRed,
    setSdal
} from "../../../store/examSlice.ts";
import {pushError, pushSelectedQuestion, resetUserData} from "../../../store/userDataSlice.ts";
import {useNavigate} from "react-router-dom";
import logIn from "../../LogIn/LogIn.tsx";
import {
    cleanError,
    setErrorStatus,
    setErrorText,
    setErrorTitle,
    setErrortWindWisible
} from "../../../store/backErrorSlise.ts";
import {setWind} from "../../../store/styleSlise.ts";


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


    // dispatch(setWind('exam'))
    console.log(`wind: ${wind}`)

    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);

    useEffect(() => {

        if(localStorage.getItem('PDD_examTicket')){
            console.log('!!!!')

            const storedData = localStorage.getItem('PDD_examTicket');
            const parsedData = storedData ? JSON.parse(storedData) : null;
            console.log(parsedData)

            let red = 0
            let green = 0
            let active = 0

            parsedData.forEach((el: { status: string; }, ind: number)=>{
                if(el.status==='red'){
                    red++
                } else if(el.status==='green'){
                    green++
                } else {
                    // if(!active) active=ind
                }
            })

            dispatch(setRed(red))
            dispatch(setGreen(green))
            // dispatch(setExamActiveQuest(active))

        }
    }, []);

    useEffect(() => {
        number = red+green
            }, [red, green]);

    useEffect(() => {

    }, [number]);

    console.log(`image: ${image}`)

    const pathToImg = image.substr(1)

    const [errorAnswerRed , setErrorAnswerRed] = useState(''); //окрас красным неверного ответа при работе над ошибками
    const [answerIndex, setAnswerIndex] = useState(-1);
    const [crashMission, setCrashMission] = useState(false);

    let errorTimer:number|undefined
    const handleAnswerClick = (index:number, isCorrect:boolean) => {

        clearTimeout(errorTimer)
        // if(!isCorrect && wind!=='error') dispatch(pushError(id))

            if(UserData.entrance){

                //DeepS
                fetch(`http://localhost:3000/user/pusherror/${UserData.id}`, {
                    method: 'PATCH',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('PDD_accessToken')!,
                    },
                    body: JSON.stringify({ id: id, correct: isCorrect, wind: wind, yourResponse: index })
                })
                    .then(async (response) => {

                        // console.log(response)
                        if (!response.ok) {
                            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
                        }
                        // console.log(response)

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
                            dispatch(setErrorTitle('Ok'));
                            dispatch(setErrorStatus('204'));
                            dispatch(setErrorText('Бекенд вернул пустой ответ'));
                            dispatch(setErrortWindWisible());
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        console.log('Произошла ошибка:', err.message);

                        localStorage.removeItem('PDD_accessToken')
                        localStorage.removeItem('PDD_examTicket')
                        localStorage.removeItem('PDD_id')
                        localStorage.removeItem('PDD_marafon')

                        navigate('/login')

                        dispatch(setErrorTitle('Fetch error:'));
                        dispatch(setErrorStatus(err.status));
                        dispatch(setErrorText('Чтото пошло не так\nВойдите чтобы продолжить'));
                        dispatch(setErrortWindWisible());
                        dispatch(resetUserData());

                    });

                errorTimer = setTimeout(()=>{
                    dispatch(cleanError(null))
                },700)
                //DeepS

            } else {

            }

        console.log(`red+green = ${red+green}`)

        console.log(
            'list[activeQwest].response:\n', list[activeQwest].response, '\n',
            'list[activeQwest].yourResponse: ', '\n', list[activeQwest].yourResponse, '\n',
            'index: ', '\n', index, '\n',
            'list[activeQwest].answers[index].is_correct:', '\n', list[activeQwest].answers[index].is_correct, '\n'
        )

        if(wind==='exam'){

            console.log('#####\n', "EXAM", '\n', 'red: ', red, '\n', 'green: ', green, '\n#####')

            if(red+green+1===20 && red<3) {
                console.log('CONGRAT...')
                dispatch(examPushAnswerQuest({isCorrect,index}))
                dispatch(setSdal(true))
                // localStorage.removeItem('PDD_examTicket')
                return
            } else if (red+green+1===20){
                setTimeout(()=>{
                    dispatch(resetExam())

                    navigate('/examticket')
                },1000)
            }
            dispatch(examPushAnswerQuest({isCorrect,index}))
            // localStorage.setItem("PDD_examTicket", JSON.stringify(list))


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

        let errorTimer:number|undefined

        clearTimeout(errorTimer)

        if(UserData.entrance){

            fetch(`http://localhost:3000/user/redactstar/${UserData.id}`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('PDD_accessToken')!,
                },
                body: JSON.stringify({id:id})
            })
                .then(async (response) => {
                    console.log("Response status:", response.status);

                    if (!response.ok) {
                        if(response.status === 400){
                            console.log('TOKENS ERROR')
                            localStorage.removeItem('PDD_accessToken')
                            localStorage.removeItem('PDD_id')
                            dispatch(resetUserData())

                            dispatch(setErrorTitle('Ошибка токена'));
                            dispatch(setErrorText(`${response.statusText}, \nвойдите в учетную запись`));
                            dispatch(setErrorStatus(response.status));
                            dispatch(setErrortWindWisible());
                        }
                        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                    }

                    // Для статусов 200/204 показываем успех
                    if(response.status === 200 || response.status === 204){
                        dispatch(setErrorTitle('Успешно'));
                        dispatch(setErrorText(response.statusText));
                        dispatch(setErrorStatus(response.status));
                        dispatch(setErrortWindWisible());
                    }

                    // Парсим ответ только один раз
                    const text = await response.text();

                    if (!text.trim()) {
                        console.log('Пустой ответ от сервера');
                        return null;
                    }

                    try {
                        return JSON.parse(text);
                    } catch (error) {
                        console.error('JSON Parse Error:', error);
                        return null;
                    }
                })
                .then((data) => {
                    if (data && data.accessToken) {
                        console.log('Данные получены', data.accessToken);
                        localStorage.setItem('PDD_accessToken', data.accessToken);
                    } else {
                        console.log('Нет accessToken в ответе');
                    }
                })
                .catch((err) => {
                    console.log('Произошла ошибка', err);
                    dispatch(setErrorTitle('Ошибка'));
                    dispatch(setErrorText(err.toString()));
                    dispatch(setErrorStatus(err.status));
                    dispatch(setErrortWindWisible());
                });

            // fetch(`http://localhost:3000/user/redactstar/${UserData.id}`, {
            //     method: 'PATCH', // Указываем метод запроса
            //     credentials: "include",
            //     headers: {
            //         'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
            //         'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
            //     },
            //     body: JSON.stringify({id:id})
            // })
            //     .then((response) => {
            //
            //         console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");
            //
            //         console.log('response:\n', response)
            //         if (!response.ok) {
            //             console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");
            //
            //             if(response.status === 400){
            //                 console.log('TOKENS ERROR')
            //                 localStorage.removeItem('PDD_accessToken')
            //                 localStorage.removeItem('PDD_id')
            //                 dispatch(resetUserData())
            //
            //                 dispatch(setErrorTitle('Ошибка токена'));
            //                 dispatch(setErrorText(`${response.statusText}, \nвойдите в учетную запись`));
            //                 dispatch(setErrorStatus(response.status || 500));
            //                 dispatch(setErrortWindWisible());
            //             }
            //             throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
            //         } else {
            //             console.log(response)
            //             if(response.status === 200 || response.status === 204){
            //                 dispatch(setErrorTitle('Успешно'));
            //                 dispatch(setErrorText(response.statusText));
            //                 dispatch(setErrorStatus(response.status || 500));
            //                 dispatch(setErrortWindWisible());
            //             }
            //         }
            //
            //         // return response.json()
            //         return response.text()
            //     })
            //
            //     .then((data) => {
            //         console.log('Данные получены', JSON.parse(data).accessToken)
            //         localStorage.setItem('PDD_accessToken', JSON.parse(data).accessToken)
            //         if (!data) {
            //             throw new Error("Empty response");
            //         }
            //         return JSON.parse(data); // Парсим JSON только если есть данные
            //
            //     })
            //     .catch((err) => {
            //         console.log('Произошла ошибка', err)
            //
            //         dispatch(setErrorTitle('Ошибка'));
            //         dispatch(setErrorText(err.toString()));
            //         dispatch(setErrorStatus(err.status));
            //         dispatch(setErrortWindWisible());
            //
            //     })

            errorTimer = setTimeout(()=>{
                dispatch(cleanError(null))
            },5000)

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