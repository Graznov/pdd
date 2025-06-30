import {createSlice} from '@reduxjs/toolkit'

export interface backError {
    backErrorWindVisible:boolean,
    title:string | null,
    status:string | null,
    text:string | null,
}

const initialState:backError = {
    backErrorWindVisible:false,
    title:null,
    status:null,
    text:null,
}

const backErrorSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {

        setErrortWindWisible(state){
            state.backErrorWindVisible = true
        },
        setErrorTitle(state, action){
            state.title = action.payload
        },
        setErrorStatus(state, action){
            state.status = action.payload
        },
        setErrorText(state, action){
            state.text = action.payload
        },
        cleanError(state,action){
            state.title = action.payload;
            state.text = action.payload;
            state.text = action.payload;
            state.backErrorWindVisible = false
        }
    }

})

export const {
    setErrortWindWisible,
    setErrorTitle,
    setErrorStatus,
    setErrorText,
    cleanError
} = backErrorSlice.actions;

export default backErrorSlice.reducer