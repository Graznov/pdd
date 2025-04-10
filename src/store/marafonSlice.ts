import {createSlice} from '@reduxjs/toolkit'

export interface marafonState {

}

const initialState:marafonState = {

}

const marafonSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {

        // ...Redusers:...


    }

})

export const {
    // styleVisibleAddTask,


} = marafonSlice.actions;
export default marafonSlice.reducer