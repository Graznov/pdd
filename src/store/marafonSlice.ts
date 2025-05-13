import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";


export interface marafonState {
    activeQuest:number,
    activeQuestError:number,
    listQuests:quest[],
    listQuestionError:quest[],
    green:number,
    red:number,
}

const initialState:marafonState = {
    activeQuest:0,
    activeQuestError:0,
    listQuestionError:[],
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
        setActiveQwestErrors(state, action){
            state.activeQuestError = action.payload
        },
        setListQuestionError(state, action){
            state.listQuestionError = action.payload
        },

        setActiveQwestPlus(state){

            state.activeQuest++
            nextQuest()
            function nextQuest(){
                if (state.activeQuest===800) state.activeQuest=0
                if (state.listQuests[state.activeQuest].response){
                    state.activeQuest++
                    nextQuest()
                }
            }
        },
        setActiveQwestERRORPlus(state){

            state.activeQuestError++
            // nextQuest()
            // function nextQuest(){
            //     if (state.activeQuest===800) state.activeQuest=0
            //     if (state.listQuests[state.activeQuest].response){
            //         state.activeQuest++
            //         nextQuest()
            //     }
            // }
        },

        setListQuest(state, action){
            state.listQuests = action.payload
        },

        pushAnswerQuest(state, action){
            if(action.payload.isCorrect) {
                state.green++
            } else {
                state.red++
            }

            state.listQuests[state.activeQuest].response = true
            state.listQuests[state.activeQuest].yourResponse = action.payload.index

            state.listQuests[state.activeQuest].status = (action.payload.isCorrect)?'green':'red'
            console.log("%c" +
                `marafonSlice.ts\naction.payload: ${JSON.stringify(action.payload)}\nactiveQuest: ${state.activeQuest}\nred/green: ${state.red} / ${state.green}\nyourResp: ${state.listQuests[state.activeQuest].yourResponse}`,
                "color:orange;font-size:17px;");

        }


    }

})

export const {
    setActiveQwest,
    setActiveQwestPlus,
    setListQuest,
    pushAnswerQuest,
    setActiveQwestErrors,
    setListQuestionError,
    setActiveQwestERRORPlus
} = marafonSlice.actions;
export default marafonSlice.reducer