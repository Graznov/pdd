import classNames from 'classnames/bind';
import styles from './exam.module.css';
import * as examList from "../../../pdd_russia/questions/A_B/tickets/allTickets.json"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useState} from "react";
import {quest} from "../../store/interface.ts";
import {setExamList} from "../../store/examSlice.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {setWind} from "../../store/styleSlise.ts";

const cx = classNames.bind(styles);

function Exam(){

    console.log("%c"
        + `Exam.tsx\nСУКА_БЛЯТЬ`,
        "color:yellow;font-size:17px;")
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    dispatch(setWind('exam'))

    const red = useAppSelector(state => state.examSlice.red);

    // const examActiveQwest = useAppSelector(state => state.examSlice.examActiveQuest)
    // const examList = useAppSelector(state => state.examSlice.examList);
    // const red = useAppSelector(state => state.marafonSlice.red);
    // const green = useAppSelector(state => state.marafonSlice.green);

    const allExamQwest = examList.default

    function setTicket (e:number) {

        console.log("%c"
            + `Exam.tsx\n${e}`,
            "color:yellow;font-size:17px;");

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
        dispatch(setExamList(examTicket));
        // console.log(examTicket)
        setTicketsAreaBtn(false)
        navigate("/exam/ticket")

    }

    const [ticketsAreaBtn, setTicketsAreaBtn] = useState(false);

    return(
        <div className={cx('exam')}>

            <div className={cx('exam-nesdal', {
                'exam-nesdal--visible': red === 3
            })}>
                НЕ СДАЛ
            </div>

            <div className={cx('exam_tickets')}>
                <button
                    onClick={() => setTicketsAreaBtn(!ticketsAreaBtn)}>
                    Выбрать билет
                </button>
                <div className={cx('exam_tickets_btnArea', {
                    'exam_tickets_btnArea_visible': ticketsAreaBtn
                })}>
                    {
                        allExamQwest.map((e:quest[], ind:number) => (
                            <button
                                key={e[0].ticket_number}
                                className={cx('exam_tickets_btnArea_btn', {})}
                                onClick={() => setTicket(ind)}>
                                {e[0].ticket_number}
                            </button>
                        ))
                    }
                </div>


            </div>
            <Outlet/>
        </div>
    )
}

export default Exam;