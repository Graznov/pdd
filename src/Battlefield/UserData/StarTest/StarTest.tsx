import classNames from 'classnames/bind';
import styles from './starTest.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import * as All from "../../../../pdd_russia/questions/A_B/All/all.json";
import SearchContainer from "../../Components/SearchContainer/SearchContainer.tsx";
import {setWind} from "../../../store/styleSlise.ts";

const cx = classNames.bind(styles);

function StarTest(){
    const dispatch = useAppDispatch()

    const starID = useAppSelector(state => state.userDataSlice.starQuestions)
    const wind = useAppSelector(state => state.styleSlice.wind)

    const listStarID = All.default.filter(a=>starID.includes(a.id));

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
                listStarID.map((qwest) => (
                    <SearchContainer
                        key={qwest.id}
                        id={qwest.id}
                        question={qwest.question}
                        image={qwest.image}
                        correct_answer={qwest.correct_answer}
                        answers={qwest.answers}
                    />
                ))
            }

        </div>
    )
}

export default StarTest;
