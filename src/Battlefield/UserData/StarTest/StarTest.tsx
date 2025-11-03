import classNames from 'classnames/bind';
import styles from './starTest.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import All from "../../../../pdd_russia/questions/A_B/All/all.json";
// import * as All from "../../../../pdd_russia/questions/A_B/All/all.json";
import SearchContainer from "../../Components/SearchContainer/SearchContainer.tsx";
import {setWind} from "../../../store/styleSlise.ts";

const cx = classNames.bind(styles);

interface AnswerStar {
    answer_tip : string,
    answers : {
        is_correct: boolean;
        answer_text: string;
    }[],
    correct_answer : string,
    id : string;
    image : string,
    question : string,
    ticket_category : string,
    ticket_number : string,
    title : string,
    topic : string[]
}

function StarTest(){


    const dispatch = useAppDispatch()

    const starID = useAppSelector(state => state.userDataSlice.starQuestions)
    const wind = useAppSelector(state => state.styleSlice.wind)

    const listStarID = All.filter(a=>starID.includes(a.id));

    console.log(listStarID)

    dispatch(setWind('star'))


    console.log('StarTest.tsx',
        '\n', 'Wind: ',
        '\n', wind,
        '\n', `starID:`,
        '\n', starID,
        '\n', 'listStarID',
        '\n', listStarID,);


    return(
        <div>
            <div className={cx("star_title")}>
                Выбранные вопросы:
            </div>
            {
                listStarID.map((qwest:AnswerStar) => (
                    <SearchContainer
                        key={qwest.id}
                        id={qwest.id}
                        question={qwest.question}
                        image={qwest.image}
                        // correct_answer={qwest.correct_answer}
                        answers={qwest.answers}
                    />
                ))
            }

        </div>
    )
}

export default StarTest;
