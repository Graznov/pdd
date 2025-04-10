import {createSlice} from '@reduxjs/toolkit'
import {searcheState} from "./interface.ts";

const initialState:searcheState = {
    searchArrQuest:[],
    searchText:'',
}

const searchSlice = createSlice({
    name: 'defSlice',
    initialState,
    reducers:{

        // ...Redusers:...

        setSearchArrQuest(state, action){
            console.log(action.payload)
            state.searchArrQuest = action.payload
        },

    }

})

export const {

    setSearchArrQuest,

} = searchSlice.actions;
export default searchSlice.reducer