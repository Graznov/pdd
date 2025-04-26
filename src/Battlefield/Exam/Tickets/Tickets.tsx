import classNames from "classnames/bind";
import styles from "./tickets.module.css";
import {quest} from "../../../store/interface.ts";
import {NavLink} from "react-router-dom";
import {setWind} from "../../../store/styleSlise.ts";
import {setExamActiveQuest, setExamList, setGreen, setRed} from "../../../store/examSlice.ts";
import {useAppDispatch} from "../../../store/hooks.ts";
import * as examList from "../../../../pdd_russia/questions/A_B/tickets/allTickets.json";

const cx = classNames.bind(styles);


function Tickets(){

    const dispatch = useAppDispatch()

    const allExamQwest = examList.default

    function setTicket (e:number) {

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
    }


    return (
        <div className={cx('exam_tickets_btnArea', {
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
                        to={`/examticket/ticket`}
                        key={e[0].ticket_number}
                        className={cx('exam_tickets_btnArea_btn', {})}
                    >
                        {e[0].ticket_number}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default Tickets;