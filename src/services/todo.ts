import type { IResponse, ITodo } from "@/types/todo.type"
import { api } from "@/utils/api"
import axios from "axios"

export async function getData() {
   const { data } = await axios.get<IResponse<ITodo[]>>(`${api}/api/to-dos`)
   return data.data
}

export async function getDataById(id: number) {
   const { data } = await axios.get<IResponse<ITodo | null>>(`${api}/api/to-dos/${id}`)
   return data.data
}

export function addData(formdata: FormData) {
   return axios.post(`${api}/api/to-dos`, formdata)
}

export function editData(user: { id: number; name: string; description: string }) {
   return axios.put(`${api}/api/to-dos`, user)
}

export function deleteData(id: number) {
   return axios.delete(`${api}/api/to-dos?id=${id}`)
}

export function changeStatus(id: number) {
   return axios.put(`${api}/completed?id=${id}`)
}

export function addImages({ id, formdata }: { id: number; formdata: FormData }) {
   return axios.post(`${api}/api/to-dos/${id}/images`, formdata)
}

export function deleteImage(id: number) {
   return axios.delete(`${api}/api/to-dos/images/${id}`)
}
