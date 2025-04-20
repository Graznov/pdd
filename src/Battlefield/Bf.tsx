import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import * as All from "../../pdd_russia/questions/A_B/All/all.json"
import {useAppDispatch} from "../store/hooks.ts";
import {setSearchArrQuest} from "../store/searchSlice.ts";
import {props_mission, quest} from "../store/interface.ts";
import {useState} from "react";
import Close from '/src/assets/close.svg?react'
import {setExamActiveQuest, setExamList, setGreen, setRed} from "../store/examSlice.ts";
import * as examList from "../../pdd_russia/questions/A_B/tickets/allTickets.json";
import {setWind} from "../store/styleSlise.ts";

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
    const allExamQwest = examList.default

    function setTicket (e:number) {

        // console.log("%c"
        //     + `Exam.tsx\n${e}`,
        //     "color:yellow;font-size:17px;");

        const examTicket:quest[] = allExamQwest[e].reduce((res:quest[], elem:quest, ind:number)=>{

            res.push({
                ...elem,
                number: ind,
                response: false,
                status: 'none',
                yourResponse:null
            })

            return res
        },[])
        console.log(examTicket[0].response)
        dispatch(setExamList(examTicket));
        // console.log(examTicket)
        // setTicketsAreaBtn(false)
        // navigate("/exam/ticket")

    }

    return (
        <div className={cx('container')}>

            <header>
                <div className={cx('content')}>

                    {/*<NavLink*/}
                    {/*    className={cx('header_logo')}*/}
                    {/*    to={'/'}>*/}
                    {/*    <img src="/src/assets/logo.svg" alt="logo"/>*/}
                    {/*</NavLink>*/}
                    <div className={cx('header_btnArea')}>
                        {/*<NavLink to={'/exam'}>Экзамен, как в 10-ке</NavLink>*/}

                        <div className={cx('exam_tickets')}>
                            {/*<button*/}
                            {/*    className={cx('exam_tickets_Btn')}*/}
                            {/*    // onClick={() => setTicketsAreaBtn(!ticketsAreaBtn)}*/}
                            {/*>*/}
                                Выбрать билет
                            {/*</button>*/}
                            <div className={cx('exam_tickets_btnArea', {
                                // 'exam_tickets_btnArea_visible': ticketsAreaBtn
                            })}>
                                {
                                    allExamQwest.map((e: quest[], ind: number) => (
                                        <NavLink
                                            onClick={() => {
                                                console.log(111)
                                                dispatch(setWind('exam'))

                                                setTicket(ind)
                                                dispatch(setExamActiveQuest(0))
                                                dispatch(setRed(0))
                                                dispatch(setGreen(0))
                                            }}
                                            to={`/examticket`}
                                            key={e[0].ticket_number}
                                            className={cx('exam_tickets_btnArea_btn', {})}
>
                                            {e[0].ticket_number}
                                        </NavLink>
                                    ))
                                }
                            </div>
                        </div>

                        <NavLink to={'/allquestions'}>Марафон</NavLink>
                    </div>

                    {/*<div className={cx('header_input')}>*/}
                    {/*    <input*/}
                    {/*        value={vallueSearch}*/}
                    {/*        onChange={enterTextSearch}*/}
                    {/*        type="text"/>*/}
                    {/*    <button*/}
                    {/*        onClick={() => {*/}
                    {/*            setVallueSearch('')*/}
                    {/*            dispatch(setSearchArrQuest([]))*/}
                    {/*        }}>*/}
                    {/*        <Close fill={'#3c3836'} width={'43px'} height={'43px'}/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}


                    <div className={cx('header_User')}>
                        <div className={cx('header_User_Name')}>User13</div>
                        {/*<img width='41px' src="https://images.icon-icons.com/10/PNG/256/user_person_customer_man_1532.png" alt="Photo"/>*/}
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