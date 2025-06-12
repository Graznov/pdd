import classNames from 'classnames/bind';
import styles from './search.module.css';
import SearchContainer from "../Components/SearchContainer/SearchContainer.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setSearchArrQuest} from "../../store/searchSlice.ts";
import {useState} from "react";
import {props_mission} from "../../store/interface.ts";
import * as All from "../../../pdd_russia/questions/A_B/All/all.json";
import Close from '/src/assets/close.svg?react'
import {setTitle, setWind} from "../../store/styleSlise.ts";


const cx = classNames.bind(styles);

function Search() {

    const dispatch = useAppDispatch()


    const searchList = useAppSelector(state => state.searchSlice.searchArrQuest);

    const [vallueSearch, setVallueSearch] = useState('')

    const enterTextSearch = (e) => {

        setVallueSearch(e.target.value)

        if(e.target.value.length > 5){
            // navigate("/search")
            const searchText = e.target.value
            // console.log(searchText)

            const searchArr:props_mission[] = []

            All.default.forEach((elem:props_mission)=>{
                if(elem.question.toLowerCase().includes(searchText.toLowerCase())) {
                    searchArr.push(elem)
                }
            })

            searchArr.forEach((el,ind)=>{
                for(let j= ind+1; j<searchArr.length; j++){
                    if(el.id === searchArr[j].id){
                        searchArr.splice(j, 1)
                    }
                }
            })

            dispatch(setSearchArrQuest(searchArr))
        } else {
            dispatch(setSearchArrQuest([]))
        }

    }

    return(


        <div className={cx('search-counter')}>
            <div className={cx('header_input')}>
                <input
                    value={vallueSearch}
                    onChange={enterTextSearch}
                    type="text"/>
                <button
                    onClick={() => {
                        setVallueSearch('')
                        dispatch(setSearchArrQuest([]))
                    }}>
                    <Close className={cx('button_close')}/>
                </button>
            </div>

            <div className={cx('search_content')}>


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

        </div>

    )
}

export default Search