import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Data {
   id: number
   name: string
}

export interface CounterState {
   data: Data[]
}

const initialState: CounterState = {
  data: [
  { id: 1, name: "Jurabek", age: 22, img: "https://i.pravatar.cc/150?img=11", job: "Frontend Developer" },
  { id: 2, name: "Murod", age: 24, img: "https://i.pravatar.cc/150?img=12", job: "Backend Developer" },
  { id: 3, name: "Farid", age: 21, img: "https://i.pravatar.cc/150?img=13", job: "UI/UX Designer" },
  { id: 4, name: "Madina", age: 23, img: "https://i.pravatar.cc/150?img=44", job: "Project Manager" },
  { id: 5, name: "Somon", age: 25, img: "https://i.pravatar.cc/150?img=14", job: "Fullstack Developer" },
  { id: 6, name: "Nigina", age: 20, img: "https://i.pravatar.cc/150?img=45", job: "QA Tester" },
  { id: 7, name: "Aziz", age: 26, img: "https://i.pravatar.cc/150?img=15", job: "Mobile Developer" },
  { id: 8, name: "Shabnam", age: 22, img: "https://i.pravatar.cc/150?img=47", job: "Graphic Designer" },
  { id: 9, name: "Daler", age: 27, img: "https://i.pravatar.cc/150?img=17", job: "DevOps Engineer" },
  { id: 10, name: "Zarina", age: 24, img: "https://i.pravatar.cc/150?img=49", job: "Data Analyst" },
],
}

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      DeleteUser: (state, {payload}) => {
         state.data = state.data.filter((el) => el.id !== payload)
      },
      EditUser: (state, {payload}) => {
         state.data = state.data.map((el) => el.id === payload.id?payload:el)
      },
      AddUser: (state, {payload}) => {
         state.data = [...state.data,payload]
      },

   },
})

export const { DeleteUser,EditUser ,AddUser} = counterSlice.actions
export default counterSlice.reducer
