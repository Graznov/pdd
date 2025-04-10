import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";


export interface marafonState {
    activeQuest:number,
    listQuests:quest[],
}



const initialState:marafonState = {
    activeQuest:0,
    listQuests:[]
}

const marafonSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {

        // ...Redusers:...

        setActiveQwest(state, action){
            state.activeQuest = action.payload
        },
        setActiveQwestPlus(state){
            state.activeQuest++
            console.log("%c" + `marafonSlice.ts\nactiveQuest: ${state.activeQuest}`, "color:orange;font-size:17px;");
        },

        setListQuest(state, action){
            state.listQuests = action.payload
        },

        pushAnswerQuest(state, action){
            console.log("%c" + `marafonSlice.ts\naction.payload: ${action.payload}\nactiveQuest: ${state.activeQuest}`, "color:orange;font-size:17px;");
            state.listQuests[state.activeQuest].response = true
            state.listQuests[state.activeQuest].status = (action.payload)?'green':'red'
        }


    }

})

export const {
    // styleVisibleAddTask,
    setActiveQwest,
    setActiveQwestPlus,
    setListQuest,
    pushAnswerQuest


} = marafonSlice.actions;
export default marafonSlice.reducer