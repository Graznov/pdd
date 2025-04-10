import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission, { props_mission } from "../Components/Mission/Mission.tsx";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
// import {ArrAllQwest, setActiveQwest} from "../../store/searchSlice.ts";
import {useEffect} from "react";
import {setActiveQwest, setListQuest} from "../../store/marafonSlice.ts";

const cx = classNames.bind(styles);

function Allquestions(){


    const dispatch = useAppDispatch()


    const activeQwest = useAppSelector(state => state.marafonSlice.activeQuest)
    const list = useAppSelector(state => state.marafonSlice.listQuests);

    if (list.length === 0) {
        const allQwest:props_mission[] = All.default.sort(function(){
            return Math.random() - 0.5;
        });

        // console.log(allQwest[13])

        const listNumbersQuest = allQwest.reduce((res, elem, ind)=>{

            res.push({
                ...elem,
                number: ind,
                response: false,
                status: 'none'
            })

            return res
        },[])

        dispatch(setListQuest(listNumbersQuest))
    }


    console.log("%c" + `Allquestions.tsx\nlist: ${list[activeQwest]}`, "color:tomato;font-size:17px;");
    // console.log(list[activeQwest]);


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

            <Mission

                // key={elem.id+elem.topic}
                // title={allQwest[qwestNumber].title}
                // disabled={true}
                activeQwest={activeQwest}
                ticket_category={list[activeQwest].ticket_category}
                ticket_number={`Вопрос ${activeQwest}`}
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
