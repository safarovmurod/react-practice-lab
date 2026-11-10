import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from "./CreateSlice"
import practice2 from "./slicePractice2"
import practice3  from "./slicePractice3"

export const store = configureStore({
  reducer: {
   data:counterSlice,
   data2:practice2,
   data3:practice3
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store