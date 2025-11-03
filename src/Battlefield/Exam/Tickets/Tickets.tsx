import classNames from "classnames/bind";
import styles from "./tickets.module.css";
import {quest} from "../../../store/interface.ts";
import {NavLink} from "react-router-dom";
import {setWind} from "../../../store/styleSlise.ts";
import {setExamActiveQuest, setExamList, setGreen, setRed, setTiketNumber} from "../../../store/examSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import examList from "../../../../pdd_russia/questions/A_B/tickets/allTickets.json";

const cx = classNames.bind(styles);

interface answer{
    title: string,
    ticket_number: string,
    ticket_category: string,
    image: string,
    question: string,
    answers: {
        answer_text: string,
        is_correct: boolean
    }[],
    correct_answer: string,
    answer_tip: string,
    topic: string[],
    id: string
}

function Tickets(){

    const dispatch = useAppDispatch()
    dispatch(setWind('exam'))

    const UserData = useAppSelector(state => state.userDataSlice)

    const allExamQwest = examList

    console.log(allExamQwest[0])

    function setTicket (e:number) {

        const examTicket:quest[] = allExamQwest[e].reduce((res:quest[], elem:answer, ind:number)=>{

            res.push({
                ...elem,
                number: ind,
                response: false,
                status: 'none',
                yourResponse:null
            })

            return res
        },[])
        console.log(examTicket[0])
        dispatch(setExamList(examTicket));
        localStorage.setItem("PDD_examTicket", JSON.stringify(examTicket));
    }

    console.log(allExamQwest[0])

    return (
        <div className={cx('exam_tickets_btnArea', {

        })}>
            {
                allExamQwest.map((e: answer[], ind: number) => (
                    <NavLink
                        onClick={() => {
                            console.log(111)
                            dispatch(setWind('exam'))
                            setTicket(ind)
                            dispatch(setExamActiveQuest(0))
                            dispatch(setRed(0))
                            dispatch(setGreen(0))
                            dispatch(setTiketNumber(ind))
                        }}
                        to={`/examticket/ticket`}
                        key={e[0].ticket_number}
                        className={cx('exam_tickets_btnArea_btn', {
                            'exam_tickets_btnArea_RED':((UserData.userName.length)?UserData.examTiketsStatus[ind].color==='red':''),
                            'exam_tickets_btnArea_GREEN':((UserData.userName.length)?UserData.examTiketsStatus[ind].color==='green':'')
                        })}
                    >
                        {e[0].ticket_number}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default Tickets;