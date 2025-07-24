import classNames from 'classnames/bind';
import styles from './examArea.module.css';
import Mission from "../../Components/Mission/Mission.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {
    resetExam,
    setExamActiveQuest,
    setExamActiveQuestPlus, setExamList,
    setNeSdal,
} from "../../../store/examSlice.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Winer from '/src/assets/win.svg?react'
import {resetUserData, setRedGreen} from "../../../store/userDataSlice.ts";
import {setWind} from "../../../store/styleSlise.ts";
// import Error from "*.svg?react";


const cx = classNames.bind(styles);

function ExamArea(){

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const UserData = useAppSelector(state => state.userDataSlice)

    const wind = useAppSelector(state => state.styleSlice.wind)
    const examActiveQuest = useAppSelector(state => state.examSlice.examActiveQuest)
    const examList = useAppSelector(state => state.examSlice.examList);
    const red = useAppSelector(state => state.examSlice.red);
    const green = useAppSelector(state => state.examSlice.green);
    const neSdal = useAppSelector(state => state.examSlice.neSdal)
    const sdal = useAppSelector(state => state.examSlice.sdal)
    const tiketNumber = useAppSelector(state => state.examSlice.ticketNumber)
    const entrance = useAppSelector(state => state.userDataSlice.entrance)

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        dispatch(setWind('exam'))

        if(localStorage.getItem('PDD_examTicket')){
            const list = localStorage.getItem('PDD_examTicket')
            let listObj
            if(list) listObj = JSON.parse(list);
            console.log(listObj)

            dispatch(setExamList(listObj));

        }

    }, []);


    useEffect(() => {
        if(!flag && red===3){
            dispatch(setNeSdal(true))
            setFlag(true)
        }
    }, [red, green]);

    // 'none'|'red'|'green'
    // let res:string='none'

    useEffect(()=>{
        if(neSdal && entrance){
            // res = 'red'
            dispatch(setRedGreen({result:'nesdal', tiketNumber:tiketNumber}))
        }else if(sdal && entrance){
            // res = 'green'
            dispatch(setRedGreen({result:'sdal', tiketNumber:tiketNumber}))
        }
    },[neSdal, sdal])

    function sendToDb(res:string, tiketNumber:number){
        fetch(`http://localhost:3000/user/settickets/${UserData.id}`, {
            method: 'PATCH', // Указываем метод запроса
            credentials: "include",
            headers: {
                'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
            },
            // body: JSON.stringify([res, tiketNumber]),
            body: JSON.stringify({res:res, ticketNumber:tiketNumber}),
        })
        .then((response) => {
            // if (!response.ok) {
            //
            //     if(response.status === 400){
            //         console.log('TOKENS ERROR')
            //         localStorage.removeItem('PDD_accessToken')
            //         localStorage.removeItem('PDD_id')
            //         dispatch(resetUserData())
            //     }
            //     throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
            // }
            return response.json()
        })

        .then((data) => {
            // console.log('Данные получены', data)
            // localStorage.setItem('PDD_accessToken', data.accessToken)
        })
        .catch((err) => {
            console.log('Произошла ошибка', err.message, err.status)
        })
    }

    if (examList.length === 0) return null;
    console.log(examList)


    // console.log(tiketNumber)

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
                        onClick={()=> {
                            // dispatch(setTiketNumber('green'))
                            dispatch(resetExam())
                            localStorage.removeItem('PDD_examTicket')

                            sendToDb('green', tiketNumber)
                        }}
                        to={'/examticket'}
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
                            localStorage.removeItem('PDD_examTicket')

                            sendToDb('red', tiketNumber)

                        }}>Продолжить</button>
                        <button onClick={()=>{
                            dispatch(resetExam())
                            sendToDb('red', tiketNumber)
                            localStorage.removeItem('PDD_examTicket')

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