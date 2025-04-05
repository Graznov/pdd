import classNames from 'classnames/bind';
import styles from './mission.module.css';
import {useState} from "react";

const cx = classNames.bind(styles);

export interface props {
        image: string;
        question: string;
        ticket_category: string;
        answers: { answer_text: string, "is_correct": boolean }[];
        correct_answer: string;
        topic: string[];
        id: string;
        title: string;
        ticket_number: string;
        answer_tip: string
    }


function Mission({title, answers, answer_tip, correct_answer, id, image, question, ticket_category, ticket_number, topic}: props) {


    const pathToImg = image.substr(1)

    const [answersStatus, setAnswersStatus] = useState<{ [key: number]: 'green' | 'red' | null }>({});

    const handleAnswerClick = (index:number, isCorrect:boolean) => {
        setAnswersStatus({
            ...answersStatus,
            [index]: isCorrect ? 'green' : 'red',
        });

        setTimeout(() => {
            setAnswersStatus(prev => ({
                ...prev,
                [index]: null,
            }));
        }, 1000);
    };
    const [responseWind, setResponseWind] = useState(false);

    return (
        <div className={cx('mission')}>

            <div
                className={cx('mission_responseWind', {
                    'mission_responseWind_visible': responseWind
                })}
                onClick={() => setResponseWind(false)}>
                <div className={cx('mission_responseWind_topic')}>
                    <div>{ticket_category}</div>
                    <div>{topic}</div>
                    <div>{id}</div>
                </div>
                <div className={cx('mission_responseWind_tip')}>{answer_tip}</div>
                <div className={cx('mission_responseWind_correct')}>{correct_answer}</div>
            </div>

            <div className={cx('mission_title')}>{title} {ticket_number}</div>

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
                    answers.map((answer, index:number) => (
                        <button
                            className={cx(`answer_Btn_${index}`,{
                                'answer_Btn_Green': answersStatus[index] === 'green',
                                'answer_Btn_Red': answersStatus[index] === 'red',
                            })}
                            key={answer.answer_text}
                            onClick={()=> handleAnswerClick(index, answer.is_correct)
                        }>
                            {answer.answer_text}
                        </button>
                    ))
                }

            </div>

        </div>
    )
}

export default Mission;