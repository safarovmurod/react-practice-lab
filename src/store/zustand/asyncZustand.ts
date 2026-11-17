import axios from "axios"
import { create } from "zustand"
import type { AsyncToDoItem, EditToDo } from "@/types/async.types"

const api = "https://to-dos-api.softclub.tj"

interface AsyncZustandState {
  data: AsyncToDoItem[]
  loading: boolean
  error: string
  getData: () => Promise<void>
  PostUser: (formdata: FormData) => Promise<void>
  EditUser: (user: EditToDo) => Promise<void>
  DeleteUser: (id: number) => Promise<void>
  ChangeStatus: (id: number) => Promise<void>
}

export const useAsyncZustandStore = create<AsyncZustandState>((set, get) => ({
  data: [],
  loading: false,
  error: "",
  getData: async () => {
    set({ loading: true, error: "" })
    try {
      const { data } = await axios.get(api + "/api/to-dos")
      set({ data: data.data })
    } catch (error) {
      console.error(error)
      set({ error: "Could not load tasks. Try again." })
    } finally {
      set({ loading: false })
    }
  },
  PostUser: async (formdata) => {
    try {
      await axios.post(api + "/api/to-dos", formdata)
      await get().getData()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  EditUser: async (user) => {
    try {
      await axios.put(api + "/api/to-dos", user)
      await get().getData()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  DeleteUser: async (id) => {
    try {
      await axios.delete(api + "/api/to-dos?id=" + id)
      await get().getData()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  ChangeStatus: async (id) => {
    try {
      await axios.put(api + "/completed?id=" + id)
      await get().getData()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}))
