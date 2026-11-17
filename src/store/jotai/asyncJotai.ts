import axios from "axios"
import { atom } from "jotai"
import type { AsyncToDoItem, EditToDo } from "@/types/async.types"

const api = "https://to-dos-api.softclub.tj"
export const asyncJotaiAtom = atom<AsyncToDoItem[]>([])
export const loadingAtom = atom(false)
export const errorAtom = atom("")

export const getDataAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true)
  set(errorAtom, "")
  try {
    const { data } = await axios.get(api + "/api/to-dos")
    set(asyncJotaiAtom, data.data)
  } catch (error) {
    console.error(error)
    set(errorAtom, "Could not load tasks. Try again.")
  } finally {
    set(loadingAtom, false)
  }
})

export const PostUserAtom = atom(null, async (_get, set, formdata: FormData) => {
  try {
    await axios.post(api + "/api/to-dos", formdata)
    await set(getDataAtom)
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const EditUserAtom = atom(null, async (_get, set, user: EditToDo) => {
  try {
    await axios.put(api + "/api/to-dos", user)
    await set(getDataAtom)
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const DeleteUserAtom = atom(null, async (_get, set, id: number) => {
  try {
    await axios.delete(api + "/api/to-dos?id=" + id)
    await set(getDataAtom)
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const ChangeStatusAtom = atom(null, async (_get, set, id: number) => {
  try {
    await axios.put(api + "/completed?id=" + id)
    await set(getDataAtom)
  } catch (error) {
    console.error(error)
    throw error
  }
})
