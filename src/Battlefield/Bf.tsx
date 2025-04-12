import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import * as All from "../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch} from "../store/hooks.ts";
import {setSearchArrQuest} from "../store/searchSlice.ts";
import {props_mission} from "../store/interface.ts";
import {useState} from "react";
import Close from '/public/close.svg?react'

const cx = classNames.bind(styles);

function Bf(){

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [vallueSearch, setVallueSearch] = useState('')

    const enterTextSearch = (e) => {

        setVallueSearch(e.target.value)

        if(e.target.value.length > 5){
            navigate("/search")
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

    return (
        <div className={cx('container')}>

            <header>
                <div className={cx('content')}>

                    <NavLink
                        className={cx('header_logo')}
                        to={'/'}>
                        <img src="public/logo.svg" alt="logo"/>
                    </NavLink>

                    <div className={cx('header_input')}>
                        <input
                            value={vallueSearch}
                            onChange={enterTextSearch}
                            type="text"/>
                        <button
                            onClick={()=> {
                                setVallueSearch('')
                                dispatch(setSearchArrQuest([]))
                            }}>
                            <Close fill={'#3c3836'} width={'43px'} height={'43px'}/>
                        </button>
                    </div>


                    <div className={cx('header_btnArea')}>
                        <NavLink to={''}>Экзамен, как в 10-ке</NavLink>
                        <NavLink to={'/allquestions'}>Марафон</NavLink>
                    </div>

                    <div className={cx('header_User')}>
                        <div className={cx('header_User_Name')}>User13</div>
                        <img width='41px' src="https://images.icon-icons.com/10/PNG/256/user_person_customer_man_1532.png" alt="Photo"/>
                    </div>

                </div>
            </header>

            <main>
                <div className={cx('content')}>
                    <Outlet/>
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