import { createSlice } from "@reduxjs/toolkit"

interface MapState {
    center : number[] | undefined,
    drawings : any[]
}

const initialState : MapState = {
    center: undefined,
    drawings: []
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        defineCenter : (state, action)=>{
            state.center = action.payload
        },
        addDrawing : (state, action)=>{
            state.drawings.push((action.payload))
        },
    }
})
export const mapActions = mapSlice.actions

export default mapSlice.reducer