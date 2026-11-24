import { CarouselDemo } from "@/components/Image"
import { DialogAdd } from "@/components/DialogAdd"
import { DialogEdit } from "@/components/DialogEdit"
import DrawerDemo from "@/components/Info"
import { Button } from "@/components/ui/button"
import { changeStatus, deleteData, getData } from "@/services/todo"
import type { RootState } from "@/store/store"
import { setInfoId, setUser } from "@/store/todoSlice"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Info, Pencil, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

export default function Home() {
   const user = useSelector((state: RootState) => state.todo.user)
   const infoId = useSelector((state: RootState) => state.todo.infoId)
   const dispatch = useDispatch()
   const queryClient = useQueryClient()
   const { data, isLoading, isError } = useQuery({
      queryKey: ["todos"],
      queryFn: getData,
   })
   const deleteDataMutation = useMutation({
      mutationFn: deleteData,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
   })
   const changeStatusMutation = useMutation({
      mutationFn: changeStatus,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
   })

   if (isLoading) return <p>Loading...</p>
   if (isError) return <p role="alert">Маълумот гирифта нашуд.</p>

   return (
      <div>
         <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Home</h1>
            <DialogAdd />
         </div>
         {user && (
            <DialogEdit user={user} setUser={(nextUser) => dispatch(setUser(nextUser))} />
         )}
         {infoId !== null && (
            <DrawerDemo infoId={infoId} setInfoId={(id) => dispatch(setInfoId(id))} />
         )}

         {deleteDataMutation.isError && <p role="alert">Could not delete task. Try again.</p>}

         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((el) => (
               <div
                  key={el.id}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
               >
                  {el.images.length > 0 && <CarouselDemo img={el.images} />}

                  <div className="flex flex-1 flex-col gap-2 p-4">
                     <h2 className="truncate text-lg font-semibold">{el.name}</h2>
                     <p className="line-clamp-2 text-sm text-muted-foreground">
                        {el.description}
                     </p>

                     <label className="flex items-center gap-2 text-sm">
                        <input
                           type="checkbox"
                           checked={el.isCompleted}
                           onChange={() => changeStatusMutation.mutate(el.id)}
                        />
                        {el.isCompleted ? "Online" : "Offline"}
                     </label>

                     <div className="mt-auto flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => dispatch(setInfoId(el.id))}>
                           <Info data-icon="inline-start" />
                           Info
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => dispatch(setUser(el))}>
                           <Pencil data-icon="inline-start" />
                           Edit
                        </Button>
                        <Button
                           variant="destructive"
                           size="sm"
                           disabled={deleteDataMutation.isPending}
                           onClick={() => deleteDataMutation.mutate(el.id)}
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
