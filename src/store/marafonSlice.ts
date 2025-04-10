import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";


export interface marafonState {
    activeQuest:number,
    listQuests:quest[],
    green:number,
    red:number,
}

const initialState:marafonState = {
    activeQuest:0,
    listQuests:[],
    green:0,
    red:0
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
            nextQuest()
            function nextQuest(){
                if (state.listQuests[state.activeQuest].response){
                    state.activeQuest++
                    nextQuest()
                }
            }
        },

        setListQuest(state, action){
            state.listQuests = action.payload
        },

        pushAnswerQuest(state, action){
            (action.payload) ? state.green++ : state.red++

            console.log("%c" + `marafonSlice.ts\naction.payload: ${action.payload}\nactiveQuest: ${state.activeQuest}\nred/green: ${state.red} / ${state.green}`
                , "color:orange;font-size:17px;");
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