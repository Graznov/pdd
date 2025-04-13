import {createSlice} from '@reduxjs/toolkit'
import {quest} from "./interface.ts";
// import {searcheState} from "./interface.ts";

interface examState {
    examActiveQuest:number | null,
    examList:quest[],
}

const initialState:examState = {
    examActiveQuest:null,
    examList:[]
}

const examSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers:{

        // ...Redusers:...

        // setSearchArrQuest(state, action){
        //     console.log(action.payload)
        //     state.searchArrQuest = action.payload
        // },

    }

})

export const {

    // setSearchArrQuest,

} = examSlice.actions;
export default examSlice.reducer