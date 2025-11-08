import {createSlice} from '@reduxjs/toolkit'
import {userData} from "./interface.ts";
import {STORAGE_KEYS} from "./constants.ts";

const initialState:userData = {
    entrance:false,
    userName: '',
    id:'',
    userPassword: '',
    starQuestions: [],
    errorQuestions: [],
    examTiketsStatus:[],
    marafon:[]
}

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {

        // ...Redusers:...
        setUserName(state, action){
            state.userName = action.payload.name
            state.id = action.payload.id
            state.entrance = true
            state.starQuestions = action.payload.starQuestions
            state.errorQuestions = action.payload.errorQuestions
            state.examTiketsStatus = action.payload.examTiketsStatus
        },

        setExamTikesStatus(state, action){
            state.examTiketsStatus = action.payload
        },

        resetUserData(state){
            state.userName = ''
            state.id = ''
            state.userPassword = ''
            state.starQuestions = []
            state.errorQuestions = []
            state.entrance = false
            state.examTiketsStatus = []

            STORAGE_KEYS.PDD_REMOVE_LS()
        },

        pushSelectedQuestion(state, action){
            // console.log(`action.payload: ${action.payload}`)
            if(state.starQuestions.includes(action.payload)){
                const res = state.starQuestions.reduce((r:string[],i)=>{
                    if(i!==action.payload) r.push(i)
                    return r
                },[])

                state.starQuestions = res
            } else {
                state.starQuestions.push(action.payload)
            }

            // console.log("%c" + `userDataSlice.ts\nselected: ${state.starQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");
        },

        pushError(state, action){

            if(state.errorQuestions.includes(action.payload)){
                state.errorQuestions.splice(state.errorQuestions.indexOf(action.payload), 1)
            }else{

                state.errorQuestions.push(action.payload)

            }
            // console.log("%c" + `userDataSlice.ts\nselected: ${state.starQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");
        },

        setRedGreen(state, action){

            if(action.payload.result === 'sdal'){
                state.examTiketsStatus[action.payload.tiketNumber].color = 'green'
            } else if (action.payload.result === 'nesdal'){
                state.examTiketsStatus[action.payload.tiketNumber].color = 'red'
            }

            if(!state.entrance){
                localStorage.setItem(STORAGE_KEYS.PDD_EXAM_NO_ENTERED_ALL_TICKETS, state.examTiketsStatus)
            }

        }



    }

})

export const {
    setUserName,
    setExamTikesStatus,
    resetUserData,
    pushSelectedQuestion,
    pushError,
    setRedGreen

} = userDataSlice.actions;
export default userDataSlice.reducer