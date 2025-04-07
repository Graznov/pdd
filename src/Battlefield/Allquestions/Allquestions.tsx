import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission, { props_mission} from "../Components/Mission/Mission.tsx";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest} from "../../store/defSlice.ts";

const cx = classNames.bind(styles);

function Allquestions(){
    const dispatch = useAppDispatch()

    const list = useAppSelector(state => state.defSlice.arrAllQwest);
    const activeQwest = useAppSelector(state => state.defSlice.activeQwest)


    const allQwest:props_mission[] = All.default

    // const [qwestNumber, setQwestNumber] = useState(0);

    return(

        <div className={cx('all_questions')}>

            <div className={cx('all_questions_numbers')}>

                {
                    list.map((e) => (
                            <button
                                className={cx('all_questions_numbers_qwest',{
                                    'all_questions_numbers_qwest_red': e.status === 'red',
                                    'all_questions_numbers_qwest_green': e.status === 'green',
                                    'all_questions_numbers_qwest_yellow': e.number === activeQwest,
                                })}
                                onClick={()=> {
                                    // setQwestNumber(e.number)
                                    dispatch(setActiveQwest(e.number))
                                }}>
                                {e.number}
                            </button>
                        ))
                }

            </div>

            <Mission
                // key={elem.id+elem.topic}
                // title={allQwest[qwestNumber].title}
                ticket_category={allQwest[activeQwest].ticket_category}
                ticket_number={`Вопрос ${activeQwest}`}
                image={allQwest[activeQwest].image}
                question={allQwest[activeQwest].question}
                answers={allQwest[activeQwest].answers}
                correct_answer={allQwest[activeQwest].correct_answer}
                answer_tip={allQwest[activeQwest].answer_tip}
                topic={allQwest[activeQwest].topic}
                id={allQwest[activeQwest].id}
            />

            {/*{*/}
            {/*    allQwest.map((elem:props_mission) => (*/}
            {/*            <Mission*/}
            {/*                // key={elem.id+elem.topic}*/}
            {/*                title={elem.title}*/}
            {/*                ticket_category={elem.ticket_category}*/}
            {/*                ticket_number={elem.ticket_number}*/}
            {/*                image={elem.image}*/}
            {/*                question={elem.question}*/}
            {/*                answers={elem.answers}*/}
            {/*                correct_answer={elem.correct_answer}*/}
            {/*                answer_tip={elem.answer_tip}*/}
            {/*                topic={elem.topic}*/}
            {/*                id={elem.id}*/}
            {/*            />*/}
            {/*    ))*/}
            {/*}*/}

        </div>
    )
}
export default Allquestions;
