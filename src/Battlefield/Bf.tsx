import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet} from "react-router-dom";
import * as All from "../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch} from "../store/hooks.ts";
import {setSearchArrQuest, setSearchText} from "../store/defSlice.ts";
import {props_mission} from "../store/interface.ts";

const cx = classNames.bind(styles);


function Bf(){
    const dispatch = useAppDispatch()

    const allQuest = All.default

    const enterTextSearch = (e) => {
        if(e.target.value.length > 5){
            const searchText = e.target.value
            console.log(searchText)

            let searchArr:props_mission[] = []

            allQuest.forEach((elem)=>{
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
                            onChange={enterTextSearch}
                            type="text"/>
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



                    {/*<div className={cx('content')}>*/}
                    {/*    <Mission*/}
                    {/*        title={temp.title}*/}
                    {/*        ticket_category={temp.ticket_category}*/}
                    {/*        ticket_number={temp.ticket_number}*/}
                    {/*        image={temp.image}*/}
                    {/*        question={temp.question}*/}
                    {/*        answers={temp.answers}*/}
                    {/*        correct_answer={temp.correct_answer}*/}
                    {/*        answer_tip={temp.answer_tip}*/}
                    {/*        topic={temp.topic}*/}
                    {/*        id={temp.id}*/}
                    {/*    />*/}

                    {/*</div>*/}
            </main>

            {/*<footer>*/}
            {/*    <div className={cx('content')}>*/}

            {/*    </div>*/}
            {/*</footer>*/}



        </div>
)
}

export default Bf