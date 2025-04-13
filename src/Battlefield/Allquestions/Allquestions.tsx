import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission from "../Components/Mission/Mission.tsx";
import {props_mission, quest} from "../../store/interface.ts";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest, setListQuest} from "../../store/marafonSlice.ts";

const cx = classNames.bind(styles);

function Allquestions(){


    const dispatch = useAppDispatch()


    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuest)
    const list = useAppSelector(state => state.marafonSlice.listQuests);
    const red = useAppSelector(state => state.marafonSlice.red);
    const green = useAppSelector(state => state.marafonSlice.green);

    if (list.length === 0) {
        const allQwest:props_mission[] = All.default.sort(function(){
            return Math.random() - 0.5;
        });

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

        dispatch(setListQuest(listNumbersQuest))
    }

    console.log("%c"
        + `Allquestions.tsx\nlist: ${list[activeQwest]}`,
        "color:tomato;font-size:17px;");

    return(

        <div className={cx('all_questions')}>

            <div className={cx('all_questions_numbers')}>

                {
                    list.map((e) => (
                            <button
                                key={e.number}
                                className={cx('all_questions_numbers_qwest',{
                                    'all_questions_numbers_qwest_red': e.status === 'red',
                                    'all_questions_numbers_qwest_green': e.status === 'green',
                                    'all_questions_numbers_qwest_yellow': e.number === activeQwest,
                                })}
                                onClick={()=> {
                                    dispatch(setActiveQwest(e.number))
                                }}>
                                {e.number+1}
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
                ticket_number={`Вопрос ${activeQwest+1}`}
                image={list[activeQwest].image}
                question={list[activeQwest].question}
                answers={list[activeQwest].answers}
                correct_answer={list[activeQwest].correct_answer}
                answer_tip={list[activeQwest].answer_tip}
                topic={list[activeQwest].topic}
                id={list[activeQwest].id}
            />

        </div>
    )
}
export default Allquestions;
