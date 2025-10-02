import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission from "../Components/Mission/Mission.tsx";
import {props_mission, quest} from "../../store/interface.ts";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest, setListQuest, setColorNumbers} from "../../store/marafonSlice.ts";
import {setWind} from "../../store/styleSlise.ts";
import {useEffect, useRef, useState} from "react";
import {setErrorStatus, setErrorText, setErrorTitle, setErrortWindWisible} from "../../store/backErrorSlise.ts";
import {resetUserData, setUserName} from "../../store/userDataSlice.ts";

const cx = classNames.bind(styles);

function Allquestions(){


    const dispatch = useAppDispatch()

    const UserDataID = useAppSelector(state => state.userDataSlice.id)
    const isEntered = useAppSelector(state => state.userDataSlice.entrance)
    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuest)
    const list = useAppSelector(state => state.marafonSlice.listQuests);
    const red = useAppSelector(state => state.marafonSlice.red);
    const green = useAppSelector(state => state.marafonSlice.green);

    // console.log('list.length:\n',list.length)

    console.log(`list:\n${list}\ngreen: ${green}\nred: ${red}`);

    // console.log(`red: ${red}\ngreen: ${green}`);


    dispatch(setWind('marafon'))

    const [startWindMarafon, setStartWindMarafon] = useState<boolean>(true);

    function startMarafon(e:'start'|'ext'){

        function list(){
            const allQwest:props_mission[] = All.default
            const listNumbersQuest:quest[] = allQwest.reduce((res:quest[], elem, ind)=>{
                res.push({
                    ...elem,
                    number: ind,
                    response: false,
                    status: 'none',
                    yourResponse:null
                })
                return res
            },[])
            return listNumbersQuest
        }

        if(!isEntered) {

            if(e==='start'){
                localStorage.setItem('PDD_marafon', JSON.stringify(list()))
                dispatch(setListQuest(list()))
                dispatch(setActiveQwest(0))
                console.log('start')
            } else if(e==='ext'){
                console.log('prodolzh')
                const strList = localStorage.getItem('PDD_marafon')
                const objList = (typeof strList === 'string') ? JSON.parse(strList) : []
                // dispatch(setListQuest(JSON.parse(localStorage.getItem('PDD_marafon'))))
                dispatch(setListQuest(objList))


            }
        } else {

            console.log('isEntered')
            if(e==='start'){

                const arr = list()
                localStorage.setItem('PDD_marafon', JSON.stringify(arr))
                dispatch(setListQuest(arr))

                const arrToBd = []

                arr.forEach((e) => {
                    arrToBd.push({
                        id:e.id,
                        number:e.number,
                        response:e.response,
                        status:e.status,
                        yourResponse:e.yourResponse
                    })
                })

                console.log(arrToBd)


                dispatch(setActiveQwest(0))
                console.log('start_Entered')

                fetch(`http://localhost:3000/user/startmarafon/${UserDataID}`, {
                    method: 'PATCH',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('PDD_accessToken')!,
                    },
                    body: JSON.stringify(arrToBd)
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

                        dispatch(setErrorTitle('Fetch error:'));
                        dispatch(setErrorStatus(err.status));
                        dispatch(setErrorText('Чтото пошло не так\nВойдите чтобы продолжить'));
                        dispatch(setErrortWindWisible());
                        dispatch(resetUserData());

                    });

            } else if(e==='ext'){

                ///
                // const headersToken = localStorage.getItem('PDD_accessToken') || ''
                const headersToken = localStorage.getItem('PDD_accessToken') || ''

                fetch(`http://localhost:3000/user/setmarafon/${localStorage.getItem('PDD_id')}`, {
                    method: 'GET', // Указываем метод GET
                    headers: {
                        'Content-Type': 'application/json', // Указываем тип содержимого
                        'Authorization': headersToken // Если требуется авторизация
                    },
                    credentials: "include",
                })
                    .then((response) => {

                        if (!response.ok) {
                            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                        }

                        dispatch(setErrorTitle('данные получены'));
                        dispatch(setErrorStatus(response.status || 500));
                        dispatch(setErrorText(response.statusText));
                        dispatch(setErrortWindWisible());

                        return response.json()
                    })
                    .then(data=>{

                        console.log(data)

                        const arr = list()

                        console.log(arr)

                        let red = 0
                        let green = 0

                        arr.forEach((e, i) => {
                            e.response = data[i].response
                            e.status = data[i].status
                            e.yourResponse = data[i].yourResponse

                            if((e.response && !activeQwest)) dispatch((setActiveQwest(i+1)))
                            // if((e.response)) dispatch((setActiveQwest(i)))

                            if(e.status==='red'){
                                red++
                            } else if (e.status==='green'){
                                green++
                            }


                        })

                        // console.log(`red: ${red}\ngreen: ${green}`)
                        dispatch(setColorNumbers({red:red, green:green}))
                        // setColorNumbers({red:red, green:green})


                        localStorage.setItem('PDD_marafon', JSON.stringify(arr))
                        dispatch(setListQuest(arr))



                        // if (data.accessToken) {
                            // localStorage.setItem('PDD_accessToken', data.accessToken)
                            // dispatch(setUserName(data))

                            // dispatch(setErrorTitle('данные обновлены'));
                            // dispatch(setErrorText(err));
                            // dispatch(setErrorStatus(err.status || 500));
                            // dispatch(setErrortWindWisible());
                        // }else {
                            // console.log(`NO accessToken`)
                            // dispatch(setErrorTitle('Ошибка'));
                            // dispatch(setErrorText(err));
                            // dispatch(setErrorStatus(err.status || 500));
                            // dispatch(setErrortWindWisible());
                        // }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        dispatch(setErrorTitle('Fetch error:'));
                        dispatch(setErrorStatus(error.status || 500));
                        dispatch(setErrorText(error.statusText));
                        dispatch(setErrortWindWisible());
                    });

                console.log('prodolzh_Entered')
                // const strList = localStorage.getItem('PDD_marafon')
                // const objList = (typeof strList === 'string') ? JSON.parse(strList) : []
                // dispatch(setListQuest(objList))



            }


        }

    }

    console.log(typeof JSON.stringify(localStorage.getItem('PDD_marafon')))

    // console.log("%c"
    //     + `Allquestions.tsx\nlist: ${list[activeQwest]}`,
    //     "color:tomato;font-size:17px;");

    ///
    const containerRef = useRef(null);
    const activeButtonRef = useRef(null);

    useEffect(() => {
        if (activeButtonRef.current && containerRef.current) {
            const container = containerRef.current;
            const button = activeButtonRef.current;

            // Получаем позиции и размеры
            const containerWidth = container.offsetWidth;
            const buttonLeft = button.offsetLeft;
            const buttonWidth = button.offsetWidth;

            // Вычисляем позицию для прокрутки (центрирование)
            const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

            // Плавная прокрутка
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [activeQwest]);
    ////

    return(

        <>

            <div className={cx('all_questions_start-wind',{
                'all_questions_start-wind_VISIBLE':startWindMarafon
            })}>
                <div className={cx("title")}>
                    Марафон. Все 800 вопросов
                </div>

                <div className={cx("all_questions_start-wind_btnArea")}>
                    <button onClick={()=> {
                        setStartWindMarafon(!startWindMarafon)
                        startMarafon('start')
                    }}>Начать</button>

                    {
                        (JSON.stringify(localStorage.getItem('PDD_marafon').length)>0) ? <button
                        // (red+green!==0) ? <button
                        // (list.length) ? <button
                            onClick={() => {
                                setStartWindMarafon(!startWindMarafon)
                                startMarafon('ext')
                            }}>Продолжить</button> : ''
                    }

                </div>

            </div>


            {
                (list.length) ? <div className={cx('all_questions', {
                    'all_questions_VISIBLE': !startWindMarafon
                })}>


                <div ref={containerRef} className={cx('all_questions_numbers')}>

                        {
                            list.map((e) => (
                                <button
                                    key={e.number}
                                    ref={e.number === activeQwest ? activeButtonRef : null}
                                    className={cx('all_questions_numbers_qwest', {
                                        'all_questions_numbers_qwest_red': e.status === 'red',
                                        'all_questions_numbers_qwest_green': e.status === 'green',
                                        'all_questions_numbers_qwest_yellow': e.number === activeQwest,
                                    })}
                                    onClick={() => {
                                        dispatch(setActiveQwest(e.number))
                                    }}>
                                    {e.number + 1}
                                </button>
                            ))
                        }

                    </div>

                    <div className={cx('all_questions_counter')}>
                        <div className={cx('all_questions_counter_red')}>{red}</div>
                        <div className={cx('all_questions_counter_slash')}>
                            {/*<Slash/>*/}/
                        </div>
                        <div className={cx('all_questions_counter_green')}>{green}</div>
                    </div>


                    <Mission
                        yourResponse={list[activeQwest].yourResponse}
                        status={list[activeQwest].status}
                        number={list[activeQwest].number}
                        response={list[activeQwest].response}
                        ticket_category={list[activeQwest].ticket_category}
                        ticket_number={`Вопрос ${activeQwest + 1}`}
                        image={list[activeQwest].image}
                        question={list[activeQwest].question}
                        answers={list[activeQwest].answers}
                        correct_answer={list[activeQwest].correct_answer}
                        answer_tip={list[activeQwest].answer_tip}
                        topic={list[activeQwest].topic}
                        id={list[activeQwest].id}
                    />

                </div> : ''
            }


        </>
    )
}

export default Allquestions;
