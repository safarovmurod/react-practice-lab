import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SyncItem } from "@/types/sync.types"
import { initialSyncItems } from "@/utils/mockData"

export const syncReduxSlice = createSlice({
  name: "syncRedux",
  initialState: { data: initialSyncItems },
  reducers: {
    PostUser: (state, { payload }: PayloadAction<SyncItem>) => {
      state.data.push({ ...payload, id: Date.now() })
    },
    EditUser: (state, { payload }: PayloadAction<SyncItem>) => {
      state.data = state.data.map((el) => el.id === payload.id ? payload : el)
    },
    DeleteUser: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter((el) => el.id !== payload)
    },
  },
})

export const { PostUser, EditUser, DeleteUser } = syncReduxSlice.actions
export default syncReduxSlice.reducer
