import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {allQwestArr} from "./allQwestArr.ts";
import {Cube, props_mission} from "./interface.ts";

// export interface Cube {number:number, status:'red'|'green'|'none'}

interface State {
    arrAllQwest : Cube[],
    activeQwest : number
    searchArrQuest : props_mission[]
    searchText:string
    // allQwestArr:Cube[]
}

const initialState:State = {
    arrAllQwest: allQwestArr,
    activeQwest:1,
    searchArrQuest:[],
    searchText:'',
    // allQwestArr:[]
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
        },

        setSearchText(state,action){
            state.searchText = action.payload
        },

        setSearchArrQuest(state, action){
            console.log(action.payload)
            state.searchArrQuest = action.payload
        },

        addResponsToAllQwest(state, action){
            // state.arrAllQwest.splice(action.payload-1, 1, action.payload)
            // state.arrAllQwest.push(action.payload)
            console.log(action.payload)
            // console.log(allQwestArr)

        }

    }

})

export const {
    setArrAllQwest,
    setActiveQwest,
    setSearchArrQuest,
    setSearchText,
    addResponsToAllQwest,


} = defSlice.actions;
export default defSlice.reducer