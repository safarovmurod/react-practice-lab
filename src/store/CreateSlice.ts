import { api } from "@/services/api"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface Data {
   id: number
   name: string
}

export interface CounterState {
   data: Data[]
   isloading: boolean
}

const initialState: CounterState = {
   data: [],
   isloading: false,
}

export const getData = createAsyncThunk("todo/getData", async () => {
   try {
      const { data } = await axios.get(api)
      return data
   } catch (error) {
      console.error(error)
      return []
   }
})
export const addUsers = createAsyncThunk("data/addUsers", async (user, { dispatch }) => {
   try {
      await axios.post(api, user)
      dispatch(getData())
   } catch (error) {
      console.error(error)
   }
})

export let editUser = createAsyncThunk("data/editUser", async (user, { dispatch }) => {
   try {
      await axios.put(`${api}/${user.id}`, user)
      dispatch(getData())
   } catch (error) {
      console.log(error)
   }
})

export const DeleteData = createAsyncThunk("todo/DeleteData", async (id, { dispatch }) => {
   try {
      await axios.delete(`${api}/${id}`)
      dispatch(getData())
   } catch (error) {
      console.error(error)
   }
})

export const counterSlice = createSlice({
   name: "tado",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getData.pending, (state) => {
            state.isloading = true
         })
         .addCase(getData.fulfilled, (state, { payload }) => {
            state.isloading = false
            state.data = payload
         })
         .addCase(getData.rejected, (state) => {
            state.isloading = false
         })
   },
})

export default counterSlice.reducer
