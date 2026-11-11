import { configureStore } from '@reduxjs/toolkit'
import  RedaxToolkit  from "./ReadaxToolkit"

export const store = configureStore({
  reducer: {
   data:RedaxToolkit
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store 