import { createSlice } from "@reduxjs/toolkit"
export interface Idata {
   id: number
   age: number
}
export interface CounterState {
   dataRedax: Idata[]
}
const initialState: CounterState = {
   dataRedax: [
      { id: 1, age: 21 ,status:false},
      { id: 2, age: 22 ,status:true},
   ],
}
export const RedaxToolkit = createSlice({
   name: "data",
   initialState,
   reducers: {
      deleteUserRedax: (state, { payload }) => {
         state.dataRedax = state.dataRedax.filter((el) => el.id !== payload)
      },
      AddUserRedax: (state, {payload}) => {
         state.dataRedax = [...state.dataRedax,payload]
      },
      EditUserRedax: (state, {payload}) => {
         state.dataRedax = [...state.dataRedax,payload]
      },
   },
})
export const {deleteUserRedax} = RedaxToolkit.actions
export default RedaxToolkit.reducer
