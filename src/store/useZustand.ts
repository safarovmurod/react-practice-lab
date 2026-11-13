import { api } from "@/data/api"
import axios from "axios"
import { create } from "zustand"

export interface UserInput {
   id:string
   name: string
   job: string
   img: string
}

export interface Idata {
   data: UserInput[]
}

interface store{
   data:Idata[]
   getData:()=>Promise<void>
   DeleteData:(id:string)=>Promise<void>
   EditData:(user:Idata)=>Promise<void>
   AddData:(user:UserInput)=>Promise<void>
}

export const useZustand= create<store>((set,get)=>({
   data:[],
   getData:async()=>{
      try {
         const {data}= await axios.get(api)
         set({data:data})
      } catch (error) {
         console.error(error);
      }
   },
   DeleteData:async(id)=>{
      try {
         await axios.delete(`${api}/${id}`)
         await get().getData()
      } catch (error) {
         console.error(error);
      }
   },
   EditData:async(user)=>{
      try {
        await axios.put(`${api}/${user.id}`,user)
         await get().getData()
      } catch (error) {
         console.error(error);
      }
   },
   AddData:async(user)=>{
      await axios.post(api,user)
      await get().getData()
   },
}))
