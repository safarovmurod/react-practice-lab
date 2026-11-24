import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addData } from "@/services/todo"
import type { RootState } from "@/store/store"
import { setOpen } from "@/store/todoSlice"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

export function DialogAdd() {
  const open = useSelector((state: RootState) => state.todo.open)
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{
    name: string
    description: string
    images: FileList
  }>()
  const addDataMutation = useMutation({
    mutationFn: addData,
  })

  const add = handleSubmit(async (values) => {
    setError("")
    const formdata = new FormData()

    formdata.append("Name", values.name)
    formdata.append("Description", values.description)

    for (let i = 0; i < values.images.length; i++) {
      formdata.append("Images", values.images[i])
    }

    try {
      await addDataMutation.mutateAsync(formdata)
      await queryClient.invalidateQueries({ queryKey: ["todos"] })
      reset()
      dispatch(setOpen(false))
    } catch {
      setError("Could not add task. Try again.")
    }
  })

  return (
    <Dialog open={open} onOpenChange={(open) => dispatch(setOpen(open))}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
        Add
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Add ToDo</DialogTitle>
          <DialogDescription>Add ToDo</DialogDescription>
        </DialogHeader>

        <form className="contents" onSubmit={add}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">name</label>
              <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="name"
                required
                maxLength={100}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">description</label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="description"
                required
                maxLength={1000}
                rows={3}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="images" className="text-sm font-medium">images</label>
              <input
                id="images"
                {...register("images")}
                type="file"
                multiple
                required
                accept="image/*"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </div>

          {error && <p role="alert">{error}</p>}

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isSubmitting}>Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
