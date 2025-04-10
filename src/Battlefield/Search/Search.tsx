import classNames from 'classnames/bind';
import styles from './search.module.css';
import SearchContainer from "../Components/SearchContainer/SearchContainer.tsx";
import {useAppSelector} from "../../store/hooks.ts";

const cx = classNames.bind(styles);

function Search() {


    const searchList = useAppSelector(state => state.searchSlice.searchArrQuest);

    return(
        <div className={cx('search_content')}>
            SEARCH

            {
                searchList.map((qwest) => (
                    <SearchContainer
                        key={qwest.id}
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