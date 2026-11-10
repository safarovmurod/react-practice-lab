import { createSlice } from "@reduxjs/toolkit";

const initialState ={data2:[{id:1,name:'sunbul'},{id:2,name:'mohtob'}]}



export const practice2 = createSlice({
   name:'PR2',
   initialState,
   reducers:{
   DeleteUser:(state,action)=>{
      state.data2 = state.data2.filter((el)=>el.id!==action.payload)
   },
   addUsers:(state,action)=>{
      state.data2 = [...state.data2,action.payload]
   },
   EditUsers:(state,action)=>{
      state.data2 = state.data2.map((el)=>el.id===action.payload.id?action.payload:el)
   },
   },
})
export const { DeleteUser,addUsers,EditUsers } = practice2.actions
export default practice2.reducer
