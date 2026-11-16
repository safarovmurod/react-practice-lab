import { configureStore } from "@reduxjs/toolkit";
import { todoData } from "./todoSlice";

export const store = configureStore({
   reducer:{
      [todoData.reducerPath]:todoData.reducer,
   },
   middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware().concat(todoData.middleware)
})