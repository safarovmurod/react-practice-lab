import type { AsyncForm } from "@/types/async.types"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddDialogProps {
  addUser: (formdata: FormData) => Promise<void>
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddDialog({ open, setOpen, addUser }: AddDialogProps) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<AsyncForm>()
  const [error, setError] = useState("")

  const onSubmit = handleSubmit(async (values) => {
    setError("")
    const formdata = new FormData()
    formdata.append("Name", values.name)
    formdata.append("Description", values.description)
    for (let i = 0; i < values.images.length; i++) {
      formdata.append("Images", values.images[i])
    }
    try {
      await addUser(formdata)
      reset()
      setOpen(false)
    } catch {
      setError("Could not add task. Try again.")
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <form className="contents" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new ToDo task based on the API schema.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Task Name
              </label>
              <Input {...register("name")} required maxLength={100} placeholder="e.g. Implement Zustand async store" />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
              </label>
              <Textarea {...register("description")} required maxLength={1000} placeholder="Describe the task in detail..." rows={3} />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Upload Images
              </label>
              <Input type="file" accept="image/*" multiple required {...register("images")} />
            </div>

          </div>

          {error && <p role="alert">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
