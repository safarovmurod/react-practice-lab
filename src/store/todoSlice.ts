import type { IResponse } from "@/types/todo.type";
import { api } from "@/utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const todoData = createApi({
   reducerPath:"todoData",
   baseQuery:fetchBaseQuery({baseUrl:api}),
   endpoints:(build)=>({
      getData:build.query<IResponse,void>({
         query:()=>'/api/to-dos',
      }),
      deleteData:build.mutation<unknown,number>({
         query:(id)=>({
            url:`/api/to-dos?id=${id}`,
            method:"DELETE"
         })
      }),
      changeStatus: build.mutation<unknown,number>({
         query:(id)=>({
            url:`/completed?id=${id}`,
            method:"PUT"
         })
      }),
      deleteImage: build.mutation<unknown,number>({
         query:(id)=>({
            url:`/api/to-dos/images/${id}`,
            method:"DELETE"
         })
      }),
      editData: build.mutation<unknown, { id: number; name: string; description: string }>({
         query:(user)=>({
            url:'/api/to-dos',
            method:"PUT",
            body:user
         })
      }),
      addImages: build.mutation<unknown, { id: number; formdata: FormData }>({
         query:({id,formdata})=>({
            url:`/api/to-dos/${id}/images`,
            method:"POST",
            body:formdata
         })
      }),
      AddData: build.mutation<unknown,FormData>({
         query:(formdata)=>({
            url:'/api/to-dos',
            method:"POST",
            body:formdata
         })
      })
   })
})
export const {useGetDataQuery,useDeleteDataMutation,useChangeStatusMutation,useDeleteImageMutation,useAddDataMutation,useEditDataMutation,useAddImagesMutation} = todoData
