import {createSlice} from '@reduxjs/toolkit'
import {userData} from "./interface.ts";

const initialState:userData = {
    entrance:false,
    userName: '',
    id:'',
    userPassword: '',
    starQuestions: [],
    errorQuestions: [],
    examTiketsStatus:[]
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

        resetUserData(state){
            state.userName = ''
            state.id = ''
            state.userPassword = ''
            state.starQuestions = []
            state.errorQuestions = []
            state.entrance = false
            state.examTiketsStatus = []
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





        }



    }

})

export const {
    setUserName,
    resetUserData,
    pushSelectedQuestion,
    pushError,
    setRedGreen

} = userDataSlice.actions;
export default userDataSlice.reducer