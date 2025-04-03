import classNames from 'classnames/bind';
import styles from './mission.module.css';
import Variant from "./Variant/Variant.tsx";
import {useState} from "react";

const cx = classNames.bind(styles);

export interface props {
        image: string;
        question: string;
        ticket_category: string;
        answers: object[];
        correct_answer: string;
        topic: string[];
        id: string;
        title: string;
        ticket_number: string;
        answer_tip: string
    }


function Mission({title, answers, answer_tip, correct_answer, id, image, question, ticket_category, ticket_number, topic}: props) {


    const pathToImg = image.substr(1)

    const STATUS = {
        green_0:false,
        red_0:false,
        green_1:false,
        red_1:false,
        green_2:false,
        red_2:false,
        green_3:false,
        red_3:false,
        green_4:false,
        red_4:false,
    }
    const [answerStatus, setAnswerStatus] = useState(STATUS);
    const [responseWind, setResponseWind] = useState(false);
    return (
        <div className={cx('mission')}>

            <div
                className={cx('mission_responseWind',{
                    'mission_responseWind_visible': responseWind
                })}
                onClick={()=>setResponseWind(false)}>
                <div className={cx('mission_responseWind_tip')}>{answer_tip}</div>
                <div className={cx('mission_responseWind_correct')}>{correct_answer}</div>
            </div>

            {/*<button*/}
            {/*    className={cx('btn_response')}*/}
            {/*    onClick={() => {*/}
            {/*        setResponseWind(true)*/}
            {/*    }}*/}
            {/*>?</button>*/}
            <div className={cx('mission_title')}>{title} {ticket_number}</div>
            {/*<div></div>*/}
            {/*<div>{ticket_category}</div>*/}

            <div className={cx('mission_img')}
                 onClick={() => {
                     setResponseWind(true)
                 }}>
                <img
                    src={`pdd_russia${pathToImg}`}
                    alt={`${pathToImg}`}/>
                <div className={cx('mission_img_text')}>
                    * нужна помощь? Нажми на картинку
                </div>
            </div>


            <div className={cx('mission_question')}>{question}</div>

            <div className={cx('mission_answerArea')}>
                {
                    answers.map((answer, index) => (
                        <button
                            className={cx(`answer_Btn_${index}`,{
                                'answer_Btn_Green_0': answerStatus.green_0,
                                'answer_Btn_Green_1': answerStatus.green_1,
                                'answer_Btn_Green_2': answerStatus.green_2,
                                'answer_Btn_Green_3': answerStatus.green_3,
                                'answer_Btn_Green_4': answerStatus.green_4,
                                'answer_Btn_Red_0': answerStatus.red_0,
                                'answer_Btn_Red_1': answerStatus.red_1,
                                'answer_Btn_Red_2': answerStatus.red_2,
                                'answer_Btn_Red_3': answerStatus.red_3,
                                'answer_Btn_Red_4': answerStatus.red_4,
                            })}
                            key={answer.answer_text}
                            onClick={()=>{
                                console.log(index)

                                if(answer.is_correct){
                                    if(index===0) {
                                        setAnswerStatus({
                                            ...answerStatus,
                                            green_0: true
                                        });
                                    }

                                } else {
                                    if(index===0){
                                        setAnswerStatus({
                                            ...answerStatus,
                                            red_0: true
                                        });
                                    }
                                }
                                setTimeout(()=>{
                                    setAnswerStatus(STATUS);
                                },1000)
                            }}>
                            {answer.answer_text}
                        </button>
                    ))
                }
            </div>

            {/*<div>{correct_answer}</div>*/}
            {/*<div>{answer_tip}</div>*/}
            {/*<div>{JSON.stringify(topic)}</div>*/}
            {/*<div>{id}</div>*/}
        </div>
    )
}

export default Mission;