import { CarouselDemo } from "@/components/Image"
import { DialogAdd } from "@/components/DialogAdd"
import { DialogEdit } from "@/components/DialogEdit"
import { Button } from "@/components/ui/button"
import type { ITodo } from "@/types/todo.type"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { useChangeStatusMutation, useDeleteDataMutation, useGetDataQuery } from "../store/todoSlice"

export default function Home() {
   const [user, setUser] = useState<ITodo | null>(null)
   const { data, isLoading, isError, refetch } = useGetDataQuery()
   const [deleteData] = useDeleteDataMutation()
   const [changeStatus] = useChangeStatusMutation()
   if (isLoading) return <p>Loading...</p>
   if (isError) return <p>Маълумот гирифта нашуд.</p>

   async function handleDelete(id: number) {
      await deleteData(id).unwrap()
      refetch()
   }

   async function handleChangeStatus(id: number) {
      const user = await changeStatus(id)
      if (!user.error) refetch()
   }
   return (
      <div>
         <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Home</h1>
            <DialogAdd />
         </div>
         <DialogEdit user={user} setUser={setUser} />
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((el) => (
               <div
                  key={el.id}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
               >
                  <CarouselDemo img={el.images} />

                  <div className="flex flex-1 flex-col gap-2 p-4">
                     <h2 className="truncate text-lg font-semibold">
                        {el.name}
                     </h2>
                     <p className="line-clamp-2 text-sm text-muted-foreground">
                        {el.description}
                     </p>

                      <label className="flex items-center gap-2 text-sm">
                         <input
                            type="checkbox"
                            checked={el.isCompleted}
                            onChange={() => handleChangeStatus(el.id)}
                         />
                         {el.isCompleted ? "Online" : "Offline"}
                      </label>

                     <div className="mt-auto flex gap-2 pt-2">
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => setUser(el)}
                        >
                           <Pencil data-icon="inline-start" />
                           Edit
                        </Button>
                        <Button
                           variant="destructive"
                           size="sm"
                           onClick={() => handleDelete(el.id)}
                        >
                           <Trash2 data-icon="inline-start" />
                           Delete
                        </Button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
