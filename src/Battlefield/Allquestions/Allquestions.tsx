import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission from "../Components/Mission/Mission.tsx";
import {props_mission, quest} from "../../store/interface.ts";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest, setListQuest} from "../../store/marafonSlice.ts";
import {setWind} from "../../store/styleSlise.ts";
import {useEffect, useRef, useState} from "react";

const cx = classNames.bind(styles);

function Allquestions(){


    const dispatch = useAppDispatch()

    const isEntered = useAppSelector(state => state.userDataSlice.entrance)
    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuest)
    const list = useAppSelector(state => state.marafonSlice.listQuests);
    const red = useAppSelector(state => state.marafonSlice.red);
    const green = useAppSelector(state => state.marafonSlice.green);

    console.log('list.length:\n',list.length)


    dispatch(setWind('marafon'))

    const [startWindMarafon, setStartWindMarafon] = useState<boolean>(true);

    function startMarafon(){

        if(!isEntered) {
            console.log('list.length:\n',list.length)
            dispatch(setListQuest(localStorage.getItem('PDD_marafon')))

            console.log('list.length:\n',list.length,'/n######/n',
                'localStorage.getItem(\'PDD_marafon\'):\n',JSON.stringify(localStorage.getItem('PDD_marafon')))

            if(!list.length){
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

                localStorage.setItem('PDD_marafon', JSON.stringify(listNumbersQuest))

                dispatch(setListQuest(listNumbersQuest))
                console.log('start')
            } else {
                // const listNumbersQuest:quest[] = localStorage.getItem('PDD_marafon')
                // dispatch(setListQuest(listNumbersQuest))
                console.log('prodolzh')
            }
        }

        // if (list.length === 0) {
        //
        //     const allQwest:props_mission[] = All.default
        //
        //     const listNumbersQuest:quest[] = allQwest.reduce((res:quest[], elem, ind)=>{
        //
        //         res.push({
        //             ...elem,
        //             number: ind,
        //             response: false,
        //             status: 'none',
        //             yourResponse:null
        //         })
        //
        //         return res
        //     },[])
        //
        //     localStorage.setItem('PDD_marafon', JSON.stringify(listNumbersQuest))
        //
        //
        //     dispatch(setListQuest(listNumbersQuest))
        // } else {
        //     const listNumbersQuest:quest[] = localStorage.getItem('PDD_marafon')
        //     dispatch(setListQuest(listNumbersQuest))
        //
        // }

    }

    console.log()

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
                        startMarafon()
                    }}>Начать</button>

                    {
                        (localStorage.getItem('PDD_marafon')) ? <button
                            onClick={() => {
                                setStartWindMarafon(!startWindMarafon)
                                startMarafon()
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
