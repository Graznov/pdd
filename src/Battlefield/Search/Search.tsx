import classNames from 'classnames/bind';
import styles from './search.module.css';
import * as All from "../../../pdd_russia/questions/A_B/All/all.json"
import SearchContainer from "../Components/SearchContainer/SearchContainer.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setActiveQwest} from "../../store/defSlice.ts";

const cx = classNames.bind(styles);

const arr = All.default

function Search() {

    const dispatch = useAppDispatch()

    const searchList = useAppSelector(state => state.defSlice.searchArrQuest);

    console.log(arr[13])

    return(
        <div className={cx('search_content')}>
            SEARCH

            {
                searchList.map((qwest) => (
                    <SearchContainer
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

export default Search