import {createSlice} from '@reduxjs/toolkit'
import {userData} from "./interface.ts";

const initialState:userData = {
    // wind:null
    entrance:false,
    userName: '',
    id:'',
    // userEmail: '',
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
        },

        pushSelectedQuestion(state, action){
            state.starQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.starQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");
        },

        pushError(state, action){
            state.errorQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.selectedQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");

        }


    }

})

export const {
    setUserName,
    pushSelectedQuestion,
    pushError,

} = userDataSlice.actions;
export default userDataSlice.reducer