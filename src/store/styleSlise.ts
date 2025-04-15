import {createSlice} from '@reduxjs/toolkit'

export interface StyleState {
    wind:'exam'|'marafon'|null
}

const initialState:StyleState = {
    wind:null
}

const styleSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {
        // styleVisibleAddTask (state, action)  {
        //     state.visibleAddTask=action.payload
        // },
        setWind(state, action){
            state.wind = action.payload
        }

        // ...Redusers:...
    }

})

export const {
    // styleVisibleAddTask,
    setWind


} = styleSlice.actions;
export default styleSlice.reducer