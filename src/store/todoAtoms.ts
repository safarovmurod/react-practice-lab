import { api } from "@/utils/api"
import axios from "axios"
import { atom } from "jotai"
import { atomWithRefresh, unwrap } from "jotai/utils"

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

export const getDataAtom = atomWithRefresh(async () => {
   try {
      const { data } = await axios.get(api)
      return data.data as IData[]
   } catch (error) {
      console.error(error)
      return [] as IData[]
   }
})

export const dataAtom = unwrap(getDataAtom, (data) => data ?? [])

export const DeleteUserAtom = atom(null, async (get, set, id: number) => {
   try {
      await axios.delete(`${api}?id=${id}`)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})

export const PostUserAtom = atom(null, async (get, set, formData: FormData) => {
   try {
      await axios.post(api, formData)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})

export const EditUserAtom = atom(
   null,
   async (get, set, user: { id: number; name: string; description: string }) => {
      try {
         await axios.put(api, user)
         set(getDataAtom)
         await get(getDataAtom)
      } catch (error) {
         console.error(error)
      }
   }
)

export const AddImagesAtom = atom(null, async (get, set, id: number, files: FileList) => {
   if (files.length === 0) return
   const formData = new FormData()
   for (let i = 0; i < files.length; i++) {
      formData.append("Images", files[i])
   }
   try {
      await axios.post(`${api}/${id}/images`, formData)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})

export const DeleteImageAtom = atom(null, async (get, set, imageId: number) => {
   try {
      await axios.delete(`${api}/images/${imageId}`)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})

export const ChangeStatusAtom = atom(null, async (get, set, id: number) => {
   try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})
