import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addImages, editData } from "@/services/todo"
import type { ITodo } from "@/types/todo.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function DialogEdit({ user: editUser, setUser }: {
  user: ITodo
  setUser: (user: ITodo | null) => void
}) {
  const [error, setError] = useState("")
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{
    name: string
    description: string
    images?: FileList
  }>({
    values: {
      name: editUser.name,
      description: editUser.description,
    },
  })
  const editDataMutation = useMutation({
    mutationFn: editData,
  })
  const addImagesMutation = useMutation({
    mutationFn: addImages,
  })

  const edit = handleSubmit(async (values) => {
    setError("")
    try {
      await editDataMutation.mutateAsync({
        id: editUser.id,
        name: values.name,
        description: values.description,
      })
    } catch {
      setError("Could not update task. Try again.")
      return
    }

    if (values.images?.length) {
      const formdata = new FormData()
      for (let i = 0; i < values.images.length; i++) {
        formdata.append("Images", values.images[i])
      }

      try {
        await addImagesMutation.mutateAsync({ id: editUser.id, formdata })
      } catch {
        await queryClient.invalidateQueries({ queryKey: ["todos"] })
        setError("Could not update task. Try again.")
        return
      }
    }

    await queryClient.invalidateQueries({ queryKey: ["todos"] })
    setUser(null)
  })

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setUser(null) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Edit ToDo</DialogTitle>
          <DialogDescription>Edit ToDo</DialogDescription>
        </DialogHeader>

        <form className="contents" onSubmit={edit}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-name" className="text-sm font-medium">name</label>
              <input
                id="edit-name"
                {...register("name")}
                type="text"
                placeholder="name"
                required
                maxLength={100}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-description" className="text-sm font-medium">description</label>
              <textarea
                id="edit-description"
                {...register("description")}
                placeholder="description"
                required
                maxLength={1000}
                rows={3}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-images" className="text-sm font-medium">images</label>
              <input
                id="edit-images"
                {...register("images")}
                type="file"
                multiple
                accept="image/*"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </div>

          {error && <p role="alert">{error}</p>}

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isSubmitting}>Edit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
