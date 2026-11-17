import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AsyncToDoItem, EditToDo } from "@/types/async.types"

const api = "https://to-dos-api.softclub.tj"

export const getData = createAsyncThunk("asyncRedux/getData", async () => {
  try {
    const { data } = await axios.get(api + "/api/to-dos")
    return data.data as AsyncToDoItem[]
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const PostUser = createAsyncThunk("asyncRedux/PostUser", async (formdata: FormData, { dispatch }) => {
  try {
    await axios.post(api + "/api/to-dos", formdata)
    await dispatch(getData())
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const EditUser = createAsyncThunk("asyncRedux/EditUser", async (user: EditToDo, { dispatch }) => {
  try {
    await axios.put(api + "/api/to-dos", user)
    await dispatch(getData())
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const DeleteUser = createAsyncThunk("asyncRedux/DeleteUser", async (id: number, { dispatch }) => {
  try {
    await axios.delete(api + "/api/to-dos?id=" + id)
    await dispatch(getData())
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const ChangeStatus = createAsyncThunk("asyncRedux/ChangeStatus", async (id: number, { dispatch }) => {
  try {
    await axios.put(api + "/completed?id=" + id)
    await dispatch(getData())
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const asyncReduxSlice = createSlice({
  name: "asyncRedux",
  initialState: { data: [] as AsyncToDoItem[], loading: false, error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true
        state.error = ""
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false
        state.error = "Could not load tasks. Try again."
      })
  },
})

export default asyncReduxSlice.reducer
