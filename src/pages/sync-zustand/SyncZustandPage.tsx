import { useState } from "react"
import { useSyncZustandStore } from "@/store/zustand/syncZustand"
import type { SyncItem } from "@/types/sync.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function SyncZustandPage() {
  const { data, PostUser, EditUser, DeleteUser: handleDelete } = useSyncZustandStore()

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SyncItem | null>(null)
  const [info, setInfo] = useState<SyncItem | null>(null)

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Sync Zustand</h1>
            <Badge variant="default" className="text-xs bg-amber-600 hover:bg-amber-700 text-white">Zustand</Badge>
            <Badge variant="outline" className="text-xs">Synchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Synchronous store powered by Zustand hooks. Dashboard widget card layout.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((el) => (
          <div
            key={el.id}
            className="relative flex flex-col rounded-xl border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-amber-500/50"
          >

            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-t-xl" />

            <div className="flex items-start gap-3.5 pt-1">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-xs">
                <img
                  src={el.img}
                  alt={el.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-mono text-muted-foreground">#00{el.id}</span>
                  <Badge
                    variant={
                      el.status === "Active"
                        ? "default"
                        : el.status === "Pending"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[11px]"
                  >
                    {el.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-base tracking-tight truncate mt-0.5">
                  {el.name}
                </h3>
              </div>
            </div>

            <div className="my-4 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {el.description}
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
              <div className="text-xs text-muted-foreground font-medium">
                Sync Item
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInfo(el)}
                  className="h-7 px-2.5 text-xs gap-1"
                >
                  <Eye className="size-3" />
                  Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUser(el)}
                  className="h-7 px-2.5 text-xs gap-1"
                >
                  <Pencil className="size-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleDelete(el.id)}
                  title="Delete"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddDialog open={open} setOpen={setOpen} addUser={PostUser} />
      <EditDialog user={user} setUser={setUser} editUser={EditUser} />
      <InfoDialog info={info} setInfo={setInfo} />
    </div>
  )
}
