import { api } from "@/services/api";
import axios from "axios";
import { create } from 'zustand'

export const zustandSlice = create((set,get)=>({
   data:[],
   isloading:false,
   getData:async()=>{
   try {
      const {data} = await axios.get(api)
      set({data:data,isloading:false})
      return data
   } catch (error) {
      console.error(error);
      set({ isloading: false })
   }
   },
   DeleteUser:async(id)=>{
   try {
      await axios.delete(`${api}/${id}`)
      await get().getData()
   } catch (error) {
      console.error(error);
      set({ isloading: false })
   }
   },
   EditUser:async(user)=>{
   try {
      await axios.put(`${api}/${user.id}`,user)
      await get().getData()
   } catch (error) {
      console.error(error);
      set({ isloading: false })
   }
   },
   AddUserZ:async(user)=>{
   try {
      await axios.post(api,user)
      await get().getData()
   } catch (error) {
      console.error(error);
      set({ isloading: false })
   }
   }
}))