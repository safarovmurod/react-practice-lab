import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   data3: [
      { id: 1, name: "Janjol", job:"jengo" },
      { id: 2, name: "Rayhon", job:"jengo" },
   ],
}

export const practice3 = createSlice({
   name: "PR3",
   initialState,
   reducers: {
      EditUsers: (state, action) => {
         state.data3 = state.data3.map((el) => (el.id === action.payload.id ? action.payload : el))
      },
      DeleteUser: (state, action) => {
         state.data3 = state.data3.filter((el) => el.id !== action.payload)
      },
      addUsers: (state, action) => {
         state.data3 = [...state.data3, action.payload]
      },
   },
})
export const { DeleteUser, addUsers, EditUsers } = practice3.actions
export default practice3.reducer
