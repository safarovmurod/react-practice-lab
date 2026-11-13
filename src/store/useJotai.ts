import axios from "axios"
import { atom } from "jotai"
import { atomWithRefresh, unwrap } from "jotai/utils"
import { api } from "@/data/api"
import type { Idata, UserInput } from "@/store/useZustand"

export const getDataAtom = atomWithRefresh(async () => {
   try {
      const { data } = await axios.get<Idata[]>(api)
      return data
   } catch (error) {
      console.error(error)
      return []
   }
})

export const dataAtom = unwrap(getDataAtom, (previous) => previous ?? [])

export const addDataAtom = atom(null, async (get, set, user: UserInput) => {
   try {
      await axios.post(api, user)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
      throw error
   }
})

export const editDataAtom = atom(null, async (get, set, user: Idata) => {
   try {
      await axios.put(`${api}/${user.id}`, user)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
      throw error
   }
})

export const deleteDataAtom = atom(null, async (get, set, id: string) => {
   try {
      await axios.delete(`${api}/${id}`)
      set(getDataAtom)
      await get(getDataAtom)
   } catch (error) {
      console.error(error)
   }
})
