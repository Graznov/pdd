import classNames from 'classnames/bind';
import styles from './allquestions.module.css';
import Mission, { props_mission} from "../Components/Mission/Mission.tsx";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"


const cx = classNames.bind(styles);

// const temp:props =   {
//     "title": "Вопрос 3",
//     "ticket_number": "Билет 1",
//     "ticket_category": "A,B",
//     "image": "./images/A_B/5fa33b65fe52f38ad87c4b5226c5d3ba.jpg",
//     "question": "Можно ли Вам остановиться в указанном месте для посадки пассажира?",
//     "answers": [
//         {
//             "answer_text": "Можно",
//             "is_correct": true
//         },
//         {
//             "answer_text": "Можно, если Вы управляете такси",
//             "is_correct": false
//         },
//         {
//             "answer_text": "Нельзя",
//             "is_correct": false
//         }
//     ],
//     "correct_answer": "Правильный ответ: 1",
//     "answer_tip": "Знак 3.28 «Стоянка запрещена» не запрещает производить остановку. В указанном месте Вам совершить остановку можно.(«Дорожные знаки»)",
//     "topic": [
//         "Дорожные знаки"
//     ],
//     "id": "7d6121c8ec64a113baa6047a457e9c10"
// }

function Allquestions(){

    const allQwest:props_mission[] = All.default

    return(

        <div className={cx('all_questions')}>

            {/*<Mission*/}
            {/*    title={allQwest[613].title}*/}
            {/*    ticket_category={allQwest[613].ticket_category}*/}
            {/*    ticket_number={allQwest[613].ticket_number}*/}
            {/*    image={allQwest[613].image}*/}
            {/*    question={allQwest[613].question}*/}
            {/*    answers={allQwest[613].answers}*/}
            {/*    correct_answer={allQwest[613].correct_answer}*/}
            {/*    answer_tip={allQwest[613].answer_tip}*/}
            {/*    topic={allQwest[613].topic}*/}
            {/*    id={allQwest[613].id}*/}
            {/*/>*/}

            {
                allQwest.map((elem:props_mission) => (
                        <Mission
                            // key={elem.id+elem.topic}
                            title={elem.title}
                            ticket_category={elem.ticket_category}
                            ticket_number={elem.ticket_number}
                            image={elem.image}
                            question={elem.question}
                            answers={elem.answers}
                            correct_answer={elem.correct_answer}
                            answer_tip={elem.answer_tip}
                            topic={elem.topic}
                            id={elem.id}
                        />
                ))
            }

        </div>
    )
}
export default Allquestions;
