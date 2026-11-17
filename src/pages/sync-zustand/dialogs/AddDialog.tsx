import type { SyncItem } from "@/types/sync.types"
import { useForm } from "react-hook-form"
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
  addUser: (user: SyncItem) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddDialog({ open, setOpen, addUser }: AddDialogProps) {
  const { register, handleSubmit, reset } = useForm<SyncItem>()

  const onSubmit = handleSubmit((values) => {
    addUser(values)
    reset()
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <form className="contents" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the product details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Product Name
              </label>
              <Input {...register("name")} required placeholder="e.g. Wireless Mouse" />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
              </label>
              <Textarea {...register("description")} required placeholder="Write a short description..." rows={3} />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Image URL
              </label>
              <Input {...register("img")} required placeholder="https://images.unsplash.com/..." />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </label>
              <select {...register("status")} className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus:border-ring">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
