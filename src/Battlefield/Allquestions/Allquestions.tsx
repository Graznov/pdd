import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission, { props_mission} from "../Components/Mission/Mission.tsx";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest} from "../../store/defSlice.ts";

const cx = classNames.bind(styles);

function Allquestions(){
    const dispatch = useAppDispatch()

    const list = useAppSelector(state => state.defSlice.arrAllQwest);
    const activeQwest = useAppSelector(state => state.defSlice.activeQwest)


    const allQwest:props_mission[] = All.default


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
                disabled={true}
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

        </div>
    )
}
export default Allquestions;
