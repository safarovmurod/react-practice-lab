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
import type { AsyncToDoItem, EditToDo } from "@/types/async.types"

interface EditDialogProps {
  editUser: (user: EditToDo) => Promise<void>
  changeStatus: (id: number) => Promise<void>
  setUser: (user: AsyncToDoItem | null) => void
  user: AsyncToDoItem | null
}

export function EditDialog({ user, setUser, editUser, changeStatus }: EditDialogProps) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    values: {
      name: user?.name ?? "",
      description: user?.description ?? "",
      isCompleted: user?.isCompleted ?? false,
    },
  })
  const [error, setError] = useState("")

  if (!user) return null

  const onSubmit = handleSubmit(async (values) => {
    setError("")
    try {
      await editUser({ id: user.id, name: values.name, description: values.description })
      if (values.isCompleted !== user.isCompleted) {
        await changeStatus(user.id)
      }
      reset()
      setUser(null)
    } catch {
      setError("Could not update task. Try again.")
    }
  })

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setUser(null) }}>
      <DialogContent className="sm:max-w-md">
        <form className="contents" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the task details and status.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Task Name
              </label>
              <Input {...register("name")} required maxLength={100} placeholder="Task name" />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
              </label>
              <Textarea {...register("description")} required maxLength={1000}
                placeholder="Task description"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="async-zustand-edit-completed"
                {...register("isCompleted")}
                className="size-4 rounded border-input accent-primary"
              />
              <label
                htmlFor="async-zustand-edit-completed"
                className="text-sm font-medium cursor-pointer"
              >
                Completed
              </label>
            </div>
          </div>

          {error && <p role="alert">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUser(null)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Update Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
