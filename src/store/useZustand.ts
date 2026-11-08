import { api } from "@/utils/api"
import axios from "axios"
import { create } from "zustand"
export interface Images {
   id: number
   imageName: string
}
export interface IData {
   id: number
   isCompleted: boolean
   images: Images[]
   name: string
   description: string
}

interface TodoSlice {
   data: IData[]
   getData: () => void
   DeleteUser: (id: number) => void
   PostUser: (formData: FormData) => Promise<void>
   EditUser: (user: { id: number; name: string; description: string }) => Promise<void>
   AddImages: (id: number, files: FileList) => Promise<void>
   DeleteImage: (imageId: number) => Promise<void>
   ChangeStatus: (id: number) => Promise<void>
}

export const todoZustand = create<TodoSlice>((set, get) => ({
   data: [],
   getData: async () => {
      try {
         const { data } = await axios.get(api)
         set(() => ({ data: data.data }))
      } catch (error) {
         console.error(error)
      }
   },
   DeleteUser: async (id) => {
      try {
         await axios.delete(`${api}?id=${id}`)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
   PostUser: async (formData) => {
      try {
         await axios.post(api, formData)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
   EditUser: async (user) => {
      try {
         await axios.put(api, user)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
   AddImages: async (id, files) => {
      if (files.length === 0) return
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
         formData.append("Images", files[i])
      }
      try {
         await axios.post(`${api}/${id}/images`, formData)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
   DeleteImage: async (imageId) => {
      try {
         await axios.delete(`${api}/images/${imageId}`)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
   ChangeStatus: async (id) => {
      try {
         await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
         get().getData()
      } catch (error) {
         console.error(error)
      }
   },
}))
