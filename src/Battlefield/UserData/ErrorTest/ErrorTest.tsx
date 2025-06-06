import classNames from 'classnames/bind';
import styles from './errorTest.module.css';
import Mission from "../../Components/Mission/Mission.tsx";
import {props_mission, quest} from "../../../store/interface.ts";

import * as All from "../../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setActiveQwest, setActiveQwestErrors, setListQuest, setListQuestionError} from "../../../store/marafonSlice.ts";
import {setWind} from "../../../store/styleSlise.ts";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

function ErrorTest(){


    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuestError)

    const ErrorsArrayID = useAppSelector(state => state.userDataSlice.errorQuestions)

    const UserData = useAppSelector(state => state.userDataSlice)


    // console.log(ErrorsArray)
    // const list = useAppSelector(state => state.marafonSlice.listQuests);



    const list = All.default.filter(a=>ErrorsArrayID.includes(a.id));

    const ErrorsList:quest[] = list.reduce((res:quest[], elem:props_mission, ind:number)=>{

        res.push({
            ...elem,
            number: ind,
            response: false,
            status: 'none',
            yourResponse:null
        })

        return res
    },[])
    dispatch(setListQuestionError(ErrorsList))

    const LIST_ERROR = useAppSelector(state => state.marafonSlice.listQuestionError)



    // console.log(ErrorsList[0])

    //
    // console.log(JSON.stringify(list))
    // console.log(list[0].id)


    // const red = useAppSelector(state => state.marafonSlice.red);
    // const green = useAppSelector(state => state.marafonSlice.green);

    dispatch(setWind('error'))

    // if (list.length === 0) {
    //     const allQwest:props_mission[] = All.default.sort(function(){
    //         return Math.random() - 0.5;
    //     });
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
    //     dispatch(setListQuest(listNumbersQuest))
    // }

    // console.log("%c"
    //     + `ErrorTest.tsx\nlist: ${list}`,
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


    if(!UserData.entrance) navigate("/login");
    console.log('UserData:\n', UserData, `ERROR_QWEST\n`, ErrorsList[activeQwest], '\nlist: \n' , list[activeQwest], '\nLIST_ERROR:\n', LIST_ERROR[activeQwest], '\nErrorsArrayID:\n', ErrorsArrayID);

    return(

        <div className={cx('all_questions')}>


            <div ref={containerRef} className={cx('all_questions_numbers')}>

                {
                    ErrorsList.map((e) => (
                        <button
                            key={e.number}
                            ref={e.number === activeQwest ? activeButtonRef : null}
                            className={cx('all_questions_numbers_qwest',{
                                'all_questions_numbers_qwest_red': e.status === 'red',
                                'all_questions_numbers_qwest_green': e.status === 'green',
                                'all_questions_numbers_qwest_yellow': e.number === activeQwest,
                            })}
                            onClick={()=> {
                                dispatch(setActiveQwestErrors(e.number))
                            }}>
                            {e.number+1}
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
                yourResponse={ErrorsList[activeQwest].yourResponse}
                status={ErrorsList[activeQwest].status}
                number={ErrorsList[activeQwest].number}
                response={ErrorsList[activeQwest].response}
                ticket_category={ErrorsList[activeQwest].ticket_category}
                ticket_number={`Вопрос ${activeQwest+1}`}
                image={ErrorsList[activeQwest].image}
                question={ErrorsList[activeQwest].question}
                answers={ErrorsList[activeQwest].answers}
                correct_answer={ErrorsList[activeQwest].correct_answer}
                answer_tip={ErrorsList[activeQwest].answer_tip}
                topic={ErrorsList[activeQwest].topic}
                id={ErrorsList[activeQwest].id}
            />

        </div>
    )
}
export default ErrorTest;
