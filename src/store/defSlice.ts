import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {allQwestArr} from "./allQwestArr.ts";

export interface Cube {number:number, status:'red'|'green'|'none'}

interface State {
    arrAllQwest : Cube[],
    activeQwest : number
}

const initialState:State = {
    arrAllQwest: allQwestArr,
    activeQwest:1
}

const defSlice = createSlice({
    name: 'defSlice',
    initialState,
    reducers:{

        // ...Routes...

        setActiveQwest(state:State,action:PayloadAction){
            state.activeQwest = action.payload
        },
        setArrAllQwest(state, action){
            // state.arrAllQwest = payload
            console.log(action.payload)
            console.log(state.arrAllQwest[action.payload.activeQwest])
            if(action.payload.isCorrect){

                state.arrAllQwest[action.payload.activeQwest-1].status='green'
            } else{
                state.arrAllQwest[action.payload.activeQwest-1].status='red'
            }
        }

    }

})

export const {
    setArrAllQwest,
    setActiveQwest


} = defSlice.actions;
export default defSlice.reducer