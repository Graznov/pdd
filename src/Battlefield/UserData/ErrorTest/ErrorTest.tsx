import classNames from 'classnames/bind';
import styles from './errorTest.module.css';
import Mission from "../../Components/Mission/Mission.tsx";
import {props_mission} from "../../../store/interface.ts";
import * as All from "../../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setActiveQwestErrors, setListQuestionError} from "../../../store/marafonSlice.ts";
import {setWind} from "../../../store/styleSlise.ts";
import {useEffect, useMemo, useRef} from "react";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

function ErrorTest(){


    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuestError)
    const ErrorsArrayID = useAppSelector(state => state.userDataSlice.errorQuestions)
    const UserData = useAppSelector(state => state.userDataSlice)
    const LIST_ERROR = useAppSelector(state => state.marafonSlice.listQuestionError)

    const errorsList = useMemo(() => {
        const list = All.default.filter(a => ErrorsArrayID.includes(a.id));
        return list.map((elem:props_mission, ind:number) => ({
            ...elem,
            number: ind,
            response: false,
            status: 'none',
            yourResponse: undefined
        }));
    }, [ErrorsArrayID]);

    dispatch(setListQuestionError(errorsList))

    useEffect(() => {
        dispatch(setWind('error'))
    }, [])

    const containerRef = useRef<HTMLDivElement>(null);
    const activeButtonRef = useRef<HTMLButtonElement>(null);
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

    if(!UserData.entrance) {
        navigate("/login");
        return
    }

    console.log('UserData:\n', UserData,
        `ERROR_QWEST\n`, LIST_ERROR[activeQwest],
        '\nLIST_ERROR:\n', LIST_ERROR,
        '\nErrorsArrayID:\n', ErrorsArrayID);

    return(

        <div className={cx('all_questions')}>

            <div className={cx("title_text")}>
                Работа над ошибками
            </div>

            <div ref={containerRef} className={cx('all_questions_numbers')}>

            {
                LIST_ERROR.map((e) => (
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

            {LIST_ERROR[activeQwest] ? (
                <Mission
                    yourResponse={LIST_ERROR[activeQwest].yourResponse}
                    status={LIST_ERROR[activeQwest].status}
                    number={LIST_ERROR[activeQwest].number}
                    response={LIST_ERROR[activeQwest].response}
                    ticket_category={LIST_ERROR[activeQwest].ticket_category}
                    ticket_number={`Вопрос ${activeQwest+1}`}
                    image={LIST_ERROR[activeQwest].image}
                    question={LIST_ERROR[activeQwest].question}
                    answers={LIST_ERROR[activeQwest].answers}
                    correct_answer={LIST_ERROR[activeQwest].correct_answer}
                    answer_tip={LIST_ERROR[activeQwest].answer_tip}
                    topic={LIST_ERROR[activeQwest].topic}
                    id={LIST_ERROR[activeQwest].id}
                />
                ) : (
                <div>Loading...</div>
                )}

        </div>
    )
}
export default ErrorTest;
