import classNames from 'classnames/bind';
import styles from './bf.module.css';
import Mission, {props} from "./Components/Mission/Mission.tsx";

const cx = classNames.bind(styles);

const temp:props =   {
    "title": "Вопрос 3",
    "ticket_number": "Билет 1",
    "ticket_category": "A,B",
    "image": "./images/A_B/5fa33b65fe52f38ad87c4b5226c5d3ba.jpg",
    "question": "Можно ли Вам остановиться в указанном месте для посадки пассажира?",
    "answers": [
        {
            "answer_text": "Можно",
            "is_correct": true
        },
        {
            "answer_text": "Можно, если Вы управляете такси",
            "is_correct": false
        },
        {
            "answer_text": "Нельзя",
            "is_correct": false
        }
    ],
    "correct_answer": "Правильный ответ: 1",
    "answer_tip": "Знак 3.28 «Стоянка запрещена» не запрещает производить остановку. В указанном месте Вам совершить остановку можно.(«Дорожные знаки»)",
    "topic": [
        "Дорожные знаки"
    ],
    "id": "7d6121c8ec64a113baa6047a457e9c10"
}

function Bf(){

    return (
        <div className={cx('container')}>

            <header>
                <div className={cx('content')}>

                    <div className={cx('header_logo')}>
                        <img src="public/logo.svg" alt="logo"/>
                    </div>

                    <div className={cx('header_input')}>
                        <input type="text"/>
                    </div>


                    <div className={cx('header_btnArea')}>
                        <button>Экзамен, как в 10-ке</button>
                        <button>Марафон</button>
                    </div>

                    <div className={cx('header_User')}>
                        <div className={cx('header_User_Name')}>User13</div>
                        <img width='41px' src="https://images.icon-icons.com/10/PNG/256/user_person_customer_man_1532.png" alt="Photo"/>
                    </div>

                </div>
            </header>

            <main>
                <div className={cx('content')}>
                    <Mission
                        title={temp.title}
                        ticket_category={temp.ticket_category}
                        ticket_number={temp.ticket_number}
                        image={temp.image}
                        question={temp.question}
                        answers={temp.answers}
                        correct_answer={temp.correct_answer}
                        answer_tip={temp.answer_tip}
                        topic={temp.topic}
                        id={temp.id}
                    />

                </div>
            </main>

            {/*<footer>*/}
            {/*    <div className={cx('content')}>*/}

            {/*    </div>*/}
            {/*</footer>*/}



        </div>
)
}

export default Bf