import classNames from 'classnames/bind';
import styles from './mission.module.css';
import Variant from "./Variant/Variant.tsx";

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

        // ./images/A_B/eca08a0e2b5ffcd12bdd8ffee34afcc3.jpg

    return (
        <div className={cx('mission')}>
            <div className={cx('mission_title')}>{title} {ticket_number}</div>
            {/*<div></div>*/}
            {/*<div>{ticket_category}</div>*/}

            <div className={cx('mission_img')}>
                <img
                    src={`pdd_russia${pathToImg}`}
                    alt={`${pathToImg}`}/>
            </div>


            <div className={cx('mission_question')}>{question}</div>

            <div className={cx('mission_answerArea')}>
                {
                    answers.map((answer) => (
                        <Variant
                            key={answer.answer_text}
                            text={answer.answer_text}/>
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