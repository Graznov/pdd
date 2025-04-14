import classNames from 'classnames/bind';
import styles from './exam.module.css';
import {setActiveQwest} from "../../store/marafonSlice.ts";
import Mission from "../Components/Mission/Mission.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useState} from "react";

const cx = classNames.bind(styles);

function Exam(){

    const dispatch = useAppDispatch()

    const examActiveQwest = useAppSelector(state => state.examSlice.examActiveQuest)
    const examList = useAppSelector(state => state.examSlice.examList);
    // const red = useAppSelector(state => state.marafonSlice.red);
    // const green = useAppSelector(state => state.marafonSlice.green);


    const [ticketsAreaBtn, setTicketsAreaBtn] = useState(false);

    return(
        <div className={cx('exam')}>
            exam
            
            <div className={cx('exam_tickets')}>
                <button
                    onClick={()=>setTicketsAreaBtn(!ticketsAreaBtn)}>
                    Выбрать билет
                </button>
                <div className={cx('exam_tickets_btnArea',{
                    'exam_tickets_btnArea_visible' : ticketsAreaBtn
                })}>

                    {/*<button>Билет 2</button>*/}
                    {/*<button>Билет 3</button>*/}
                    {/*<button>Билет 4</button>*/}
                    {/*<button>Билет 5</button>*/}
                    {/*<button>Билет 6</button>*/}
                    {/*<button>Билет 7</button>*/}
                    {/*<button>Билет 8</button>*/}
                    {/*<button>Билет 9</button>*/}
                    {/*<button>Билет 10</button>*/}
                    {/*<button>Билет 11</button>*/}
                    {/*<button>Билет 12</button>*/}
                    {/*<button>Билет 13</button>*/}
                    {/*<button>Билет 14</button>*/}
                    {/*<button>Билет 15</button>*/}
                    {/*<button>Билет 16</button>*/}
                    {/*<button>Билет 17</button>*/}
                    {/*<button>Билет 18</button>*/}
                    {/*<button>Билет 19</button>*/}
                    {/*<button>Билет 20</button>*/}
                    {/*<button>Билет 21</button>*/}
                    {/*<button>Билет 22</button>*/}
                    {/*<button>Билет 23</button>*/}
                    {/*<button>Билет 24</button>*/}
                    {/*<button>Билет 25</button>*/}
                    {/*<button>Билет 26</button>*/}
                    {/*<button>Билет 27</button>*/}
                    {/*<button>Билет 28</button>*/}
                    {/*<button>Билет 29</button>*/}
                    {/*<button>Билет 30</button>*/}
                    {/*<button>Билет 31</button>*/}
                    {/*<button>Билет 32</button>*/}
                    {/*<button>Билет 33</button>*/}
                    {/*<button>Билет 34</button>*/}
                    {/*<button>Билет 35</button>*/}
                    {/*<button>Билет 36</button>*/}
                    {/*<button>Билет 37</button>*/}
                    {/*<button>Билет 38</button>*/}
                    {/*<button>Билет 39</button>*/}
                    {/*<button>Билет 40</button>*/}
                </div>



            </div>

            {/*<div className={cx('all_questions')}>*/}

            {/*    <div className={cx('all_questions_numbers')}>*/}

            {/*        {*/}
            {/*            list.map((e) => (*/}
            {/*                <button*/}
            {/*                    key={e.number}*/}
            {/*                    className={cx('all_questions_numbers_qwest', {*/}
            {/*                        'all_questions_numbers_qwest_red': e.status === 'red',*/}
            {/*                        'all_questions_numbers_qwest_green': e.status === 'green',*/}
            {/*                        'all_questions_numbers_qwest_yellow': e.number === activeQwest,*/}
            {/*                    })}*/}
            {/*                    onClick={() => {*/}
            {/*                        dispatch(setActiveQwest(e.number))*/}
            {/*                    }}>*/}
            {/*                    {e.number + 1}*/}
            {/*                </button>*/}
            {/*            ))*/}
            {/*        }*/}

            {/*    </div>*/}

            {/*    <div className={cx('all_questions_counter')}>*/}
            {/*        <div className={cx('all_questions_counter_red')}>{red}</div>*/}
            {/*        <div className={cx('all_questions_counter_slash')}>*/}
            {/*            /!*<Slash/>*!//*/}
            {/*        </div>*/}
            {/*        <div className={cx('all_questions_counter_green')}>{green}</div>*/}
            {/*    </div>*/}

            {/*    <Mission*/}
            {/*        yourResponse={list[activeQwest].yourResponse}*/}
            {/*        status={list[activeQwest].status}*/}
            {/*        number={list[activeQwest].number}*/}
            {/*        response={list[activeQwest].response}*/}
            {/*        ticket_category={list[activeQwest].ticket_category}*/}
            {/*        ticket_number={`Вопрос ${activeQwest + 1}`}*/}
            {/*        image={list[activeQwest].image}*/}
            {/*        question={list[activeQwest].question}*/}
            {/*        answers={list[activeQwest].answers}*/}
            {/*        correct_answer={list[activeQwest].correct_answer}*/}
            {/*        answer_tip={list[activeQwest].answer_tip}*/}
            {/*        topic={list[activeQwest].topic}*/}
            {/*        id={list[activeQwest].id}*/}
            {/*    />*/}

            {/*</div>*/}
        </div>
    )
}

export default Exam;