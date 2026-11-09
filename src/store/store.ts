import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from "./CreateSlice"

export const store = configureStore({
  reducer: {
   data:counterSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store