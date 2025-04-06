import {createSlice} from '@reduxjs/toolkit'

export interface StyleState {

}

const initialState:StyleState = {

}

const styleSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {
        // styleVisibleAddTask (state, action)  {
        //     state.visibleAddTask=action.payload
        // },

        // ...Routes...
    }

})

export const {
    // styleVisibleAddTask,


} = styleSlice.actions;
export default styleSlice.reducer