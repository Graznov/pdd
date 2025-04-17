import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";
// import {searcheState} from "./interface.ts";

interface examState {
    examActiveQuest:number,
    examList:quest[],
    red:number,
    green:number,
}

const initialState:examState = {
    examActiveQuest:0,
    examList:[],
    red:0,
    green:0,
}

const examSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers:{

        // ...Redusers:...

        setExamList(state,action){
            state.examList = action.payload
        },

        setExamActiveQuestPlus(state){
            state.examActiveQuest++

            nextQuest()
            function nextQuest(){
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

        },

        setRed(state, action){
            state.red = action.payload
        },
        setGreen(state, action){
            state.green = action.payload
        }


    }



})

export const {

    // setSearchArrQuest,
    setExamList,
    examPushAnswerQuest,
    setExamActiveQuest,
    setExamActiveQuestPlus,
    setRed,
    setGreen

} = examSlice.actions;
export default examSlice.reducer