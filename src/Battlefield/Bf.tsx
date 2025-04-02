import classNames from 'classnames/bind';
import styles from './bf.module.css';
import Mission, {props} from "./Components/Mission/Mission.tsx";

const cx = classNames.bind(styles);

const temp:props =   {
    "title": "Вопрос 1",
    "ticket_number": "Билет 1",
    "ticket_category": "A,B",
    "image": "./images/A_B/1ca7f207d1d6cb37e12f5835c42a041c.jpg",
    "question": "В каком случае водитель совершит вынужденную остановку?",
    "answers": [
        {
            "answer_text": "Остановившись непосредственно перед пешеходным переходом, чтобы уступить дорогу пешеходу",
            "is_correct": false
        },
        {
            "answer_text": "Остановившись на проезжей части из-за технической неисправности транспортного средства",
            "is_correct": true
        },
        {
            "answer_text": "В обоих перечисленных случаях",
            "is_correct": false
        }
    ],
    "correct_answer": "Правильный ответ: 2",
    "answer_tip": "«Вынужденная остановка» - прекращение движения транспортного средства, связанное с его технической неисправностью, опасностью, создаваемой перевозимым грузом, состоянием водителя (пассажира) или появления препятствия на дороге.(Пункт 1.2 ПДД, термин «Вынужденная остановка»)",
    "topic": [
        "Общие положения"
    ],
    "id": "ffd0c95b28a89bd4faff45a8874c4fb3"
}

function Bf(){

    return (
        <div className={cx('container')}>

            <header>
                <div className={cx('content')}>

                    <div className={cx('header_logo')}>
                        <img src="https://www.svgrepo.com/show/176733/road-road.svg" alt="logo"/>
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