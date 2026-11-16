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
import { useAddDataMutation, useGetDataQuery } from "@/store/todoSlice"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function DialogAdd() {
  const [open, setOpen] = useState(false)
  const [addData] = useAddDataMutation()
  const { refetch } = useGetDataQuery()
  const { register, handleSubmit, reset } = useForm()

  const add = handleSubmit(async (values) => {
    const formdata = new FormData()

    formdata.append("Name", values.name)
    formdata.append("Description", values.description)

    for (const image of values.images) {
      formdata.append("Images", image)
    }

    const user = await addData(formdata)

    if (!user.error) {
      refetch()
      reset()
      setOpen(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
         Add
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Add Users</DialogTitle>
          <DialogDescription>
            Add Users
          </DialogDescription>
        </DialogHeader>

        <form className="contents" onSubmit={add}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                name
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">
                description
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                placeholder="description"
                rows={3}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="images" className="text-sm font-medium">
                images
              </label>
              <input
                id="images"
                {...register("images", { required: true })}
                type="file"
                multiple
                accept="image/*"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
