import { configureStore } from "@reduxjs/toolkit"
import syncReduxReducer from "./syncReduxSlice"
import asyncReduxReducer from "./asyncReduxSlice"

export const store = configureStore({
  reducer: {
    syncRedux: syncReduxReducer,
    asyncRedux: asyncReduxReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
