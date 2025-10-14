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

let numberLocalStor:number = 0

if(localStorage.getItem('PDD_marafon')){
    const str  = localStorage.getItem('PDD_marafon')
    let strArr
    // if(typeof str === 'string'){
    //     strArr = JSON.parse(str)
    // }
    if(str){
        strArr = JSON.parse(str)
    }


    console.log(strArr.length)

    if(strArr.length) {
        // JSON.parse(str)
        for(let i=0; i<800; i++){
            if(str && !JSON.parse(str)[i].response){
                numberLocalStor = i
                break
            }
        }
    }

}

const initialState:marafonState = {
    activeQuest:numberLocalStor,
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
            console.log(action.payload[0])

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

            localStorage.setItem('PDD_marafon', JSON.stringify(state.listQuests))

            console.log("%c" +
                `marafonSlice.ts\naction.payload: ${JSON.stringify(action.payload)}\nactiveQuest: ${state.activeQuest}\nred/green: ${state.red} / ${state.green}\nyourResp: ${state.listQuests[state.activeQuest].yourResponse}`,
                "color:orange;font-size:17px;");

        },

        setColorNumbers(state, action){
            console.log("%c"
                + `marafonSlice.ts\nsetColors\naction: ${JSON.stringify(action.payload)}`,
                "color:yellow;font-size:17px;");

            state.red = action.payload.red
            state.green = action.payload.green
        },


        pushAnswerQuestERROR(state, action){

            console.log(11111)
            state.listQuestionError[state.activeQuestError].response = true
            state.listQuestionError[state.activeQuestError].yourResponse = action.payload.index

            state.listQuestionError[state.activeQuestError].status = (action.payload.isCorrect)?'green':'red'
            console.log(state.listQuestionError)
            // console.log("%c" +
            //     `marafonSlice.ts\naction.payload: ${JSON.stringify(action.payload)}\nactiveQuest: ${state.activeQuest}\nred/green: ${state.red} / ${state.green}\nyourResp: ${state.listQuests[state.activeQuest].yourResponse}`,
            //     "color:orange;font-size:17px;");

        },

        resetMarafon(state) {
            state.activeQuest = 0
            state.activeQuestError = 0
            state.listQuestionError = []
            state.listQuests = []
            state.red = 0
            state.green = 0
            console.log("%c" +
                `marafonSlice.ts\n${JSON.stringify(state)}`,
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
    setActiveQwestERRORPlus,
    // setRed,
    // setGreen,
    setColorNumbers,
    pushAnswerQuestERROR,
    resetMarafon
} = marafonSlice.actions;
export default marafonSlice.reducer