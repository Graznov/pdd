import {createSlice} from '@reduxjs/toolkit'

export interface StyleState {
    wind:'exam'|'marafon'|'search'|'user'|'error'|'star'|null
    title:'Экзамен'|'Все вопросы'|'Ошибки'|'Выбранные'|'ПДД'|'Поиск'
}

const initialState:StyleState = {
    wind:null,
    title:'ПДД'
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
        },
        setTitle(state, action){
            state.title = action.payload
        }

        // ...Redusers:...
    }

})

export const {
    // styleVisibleAddTask,
    setWind,
    setTitle


} = styleSlice.actions;
export default styleSlice.reducer