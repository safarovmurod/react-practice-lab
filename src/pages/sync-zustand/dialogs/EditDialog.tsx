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
import type { SyncItem } from "@/types/sync.types"

interface EditDialogProps {
  editUser: (user: SyncItem) => void
  setUser: (user: SyncItem | null) => void
  user: SyncItem | null
}

export function EditDialog({ user, setUser, editUser }: EditDialogProps) {
  const { register, handleSubmit, reset } = useForm<SyncItem>({
    values: {
      id: user?.id ?? 0,
      name: user?.name ?? "",
      description: user?.description ?? "",
      img: user?.img ?? "",
      status: user?.status ?? "Active",
    },
  })

  if (!user) return null

  const onSubmit = handleSubmit((values) => {
    editUser(values)
    reset()
    setUser(null)
  })

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setUser(null) }}>
      <DialogContent className="sm:max-w-md">
        <form className="contents" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Product Name
              </label>
              <Input {...register("name")} required placeholder="Product name" />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Description
              </label>
              <Textarea {...register("description")} required
                placeholder="Product description"
                rows={3}
              />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Image URL
              </label>
              <Input {...register("img")} required placeholder="Image URL" />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </label>
              <select {...register("status")} className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus:border-ring"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUser(null)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
