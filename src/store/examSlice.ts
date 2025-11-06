import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";
import {STORAGE_KEYS} from "./constants.ts";
// import {searcheState} from "./interface.ts";

interface examState {
    examActiveQuest:number,
    examList:quest[],
    red:number,
    green:number,
    neSdal:boolean,
    sdal:boolean,
    ticketNumber:number
}

const initialState:examState = {
    examActiveQuest:0,
    examList:[],
    red:0,
    green:0,
    neSdal:false,
    sdal:false,
    ticketNumber:0
}

const examSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers:{

        // ...Redusers:...

        resetExam(state){
            state.examActiveQuest = 0
            state.examList = []
            state.red = 0
            state.green = 0
            state.neSdal = false
            state.sdal = false
        },

        setExamList(state,action){
            state.examList = action.payload
        },

        setExamActiveQuestPlus(state){

            if(state.neSdal) return
            state.examActiveQuest++

            nextQuest()
            function nextQuest(){
                if(state.red+state.green===20) return
                if (state.examActiveQuest===20) state.examActiveQuest=0
                if (state.examList[state.examActiveQuest].response){
                    state.examActiveQuest++
                    nextQuest()
                }
            }
        },

        setExamActiveQuest(state,action){
             state.examActiveQuest = action.payload
        },

        examPushAnswerQuest(state, action){
            if(action.payload.isCorrect) {
                state.green++
            } else {
                state.red++
            }

            state.examList[state.examActiveQuest].response = true
            state.examList[state.examActiveQuest].yourResponse = action.payload.index

            state.examList[state.examActiveQuest].status = (action.payload.isCorrect)?'green':'red'
            // console.log("%c" +
            //     `marafonSlice.ts\naction.payload: ${JSON.stringify(action.payload)}\nactiveQuest: ${state.activeQuest}\nred/green: ${state.red} / ${state.green}\nyourResp: ${state.listQuests[state.activeQuest].yourResponse}`,
            //     "color:orange;font-size:17px;");
            console.log(`examSlice.ts`)
            localStorage.setItem(STORAGE_KEYS.PDD_EXAM, JSON.stringify(state.examList))


        },

        setRed(state, action){
            state.red = action.payload
        },
        setGreen(state, action){
            state.green = action.payload
        },

        setNeSdal(state, action){
            state.neSdal = action.payload
        },

        setSdal(state, action){
            // if(state.neSdal) return
            // if(state.red+state.green===20){
                state.sdal = action.payload
            // }
        },
        setTiketNumber(state, action){
            state.ticketNumber = action.payload
        }


    }



})

export const {

    // setSearchArrQuest,
    resetExam,
    setExamList,
    examPushAnswerQuest,
    setExamActiveQuest,
    setExamActiveQuestPlus,
    setRed,
    setGreen,
    setNeSdal,
    setSdal,
    setTiketNumber
} = examSlice.actions;
export default examSlice.reducer