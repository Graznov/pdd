import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface State {

}

const initialState:State = {

}

const defSlice = createSlice({
    name: 'defSlice',
    initialState,
    reducers:{

        // ...Routes...

    }

})

export const {


} = defSlice.actions;
export default defSlice.reducer