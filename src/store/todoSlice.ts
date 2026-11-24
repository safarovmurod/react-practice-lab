import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ITodo } from "@/types/todo.type"

interface TodoState {
   open: boolean
   user: ITodo | null
   infoId: number | null
}

const initialState: TodoState = {
   open: false,
   user: null,
   infoId: null,
}

const todoSlice = createSlice({
   name: "todo",
   initialState,
   reducers: {
      setOpen: (state, { payload }: PayloadAction<boolean>) => {
         state.open = payload
      },
      setUser: (state, { payload }: PayloadAction<ITodo | null>) => {
         state.user = payload
      },
      setInfoId: (state, { payload }: PayloadAction<number | null>) => {
         state.infoId = payload
      },
   },
})

export const { setOpen, setUser, setInfoId } = todoSlice.actions
export default todoSlice.reducer
