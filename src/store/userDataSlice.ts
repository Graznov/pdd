import {createSlice} from '@reduxjs/toolkit'
import {userData} from "./interface.ts";

const initialState:userData = {
    entrance:false,
    userName: '',
    id:'',
    userPassword: '',
    starQuestions: [],
    errorQuestions: []
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
        },

        resetUserData(state){
            state.userName = ''
            state.id = ''
            state.userPassword = ''
            state.starQuestions = []
            state.errorQuestions = []
            state.entrance = false
        },

        pushSelectedQuestion(state, action){
            state.starQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.starQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");
        },

        pushError(state, action){
            state.errorQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.starQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");

        }


    }

})

export const {
    setUserName,
    resetUserData,
    pushSelectedQuestion,
    pushError,

} = userDataSlice.actions;
export default userDataSlice.reducer