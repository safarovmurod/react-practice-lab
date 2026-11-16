import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAddImagesMutation, useEditDataMutation, useGetDataQuery } from "@/store/todoSlice"
import type { ITodo } from "@/types/todo.type"
import { useForm } from "react-hook-form"

export function DialogEdit({ user: editUser, setUser }: {
  user: ITodo | null
  setUser: (user: ITodo | null) => void
}) {
  const [editData] = useEditDataMutation()
  const [addImages] = useAddImagesMutation()
  const { refetch } = useGetDataQuery()
  const { register, handleSubmit } = useForm<{
    name: string
    description: string
    images?: FileList
  }>({
    values: {
      name: editUser?.name ?? "",
      description: editUser?.description ?? "",
    },
  })

  if (!editUser) return null

  const edit = handleSubmit(async (values) => {
    const user = await editData({
      id: editUser.id,
      name: values.name,
      description: values.description,
    })

    if (user.error) return

    if (values.images?.length) {
      const formdata = new FormData()

      for (const image of values.images) {
        formdata.append("Images", image)
      }

      const images = await addImages({ id: editUser.id, formdata })

      if (images.error) {
        refetch()
        return
      }
    }

    refetch()
    setUser(null)
  })
  return (
    <Dialog open onOpenChange={(open) => { if (!open) setUser(null) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Edit Users</DialogTitle>
          <DialogDescription>
            Edit Users
          </DialogDescription>
        </DialogHeader>

        <form className="contents" onSubmit={edit}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-name" className="text-sm font-medium">
                name
              </label>
              <input
                id="edit-name"
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-description" className="text-sm font-medium">
                description
              </label>
              <textarea
                id="edit-description"
                {...register("description", { required: true })}
                placeholder="description"
                rows={3}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-images" className="text-sm font-medium">
                images
              </label>
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

          <DialogFooter showCloseButton>
            <Button type="submit">Edit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
