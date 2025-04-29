import {createSlice} from '@reduxjs/toolkit'
import {userData} from "./interface.ts";

const initialState:userData = {
    // wind:null
    entrance:false,
    userName: '',
    userEmail: '',
    userPassword: '',
    selectedQuestions: [],
    errorQuestions: []
}

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {

        // ...Redusers:...

        pushSelectedQuestion(state, action){
            state.selectedQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.selectedQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");
        },

        pushError(state, action){
            state.errorQuestions.push(action.payload)
            console.log("%c" + `userDataSlice.ts\nselected: ${state.selectedQuestions}\nerror: ${state.errorQuestions}`, "color:white;font-size:17px;");

        }


    }

})

export const {
    pushSelectedQuestion,
    pushError,

} = userDataSlice.actions;
export default userDataSlice.reducer