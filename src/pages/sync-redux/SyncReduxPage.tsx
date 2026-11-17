import { PostUser, EditUser, DeleteUser } from "@/store/redux/syncReduxSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/redux/store"
import type { SyncItem } from "@/types/sync.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function SyncReduxPage() {
  const data = useSelector((state: RootState) => state.syncRedux.data)

  const dispatch = useDispatch()

  function addUser(user: SyncItem) {
    dispatch(PostUser(user))
  }

  function editUser(user: SyncItem) {
    dispatch(EditUser(user))
  }

  function handleDelete(id: number) {
    dispatch(DeleteUser(id))
  }

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SyncItem | null>(null)
  const [info, setInfo] = useState<SyncItem | null>(null)

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Sync Redux</h1>
            <Badge variant="default" className="text-xs bg-purple-600 hover:bg-purple-700 text-white">Redux Toolkit</Badge>
            <Badge variant="outline" className="text-xs">Synchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Synchronous catalog connected to Redux Toolkit slice. Horizontal media card layout.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((el) => (
          <div
            key={el.id}
            className="flex flex-col sm:flex-row overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs transition-all hover:shadow-md hover:border-purple-500/40"
          >

            <div className="relative sm:w-44 h-48 sm:h-auto shrink-0 overflow-hidden bg-muted">
              <img
                src={el.img}
                alt={el.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="outline" className="bg-background/90 text-[11px] font-mono">
                  #{el.id}
                </Badge>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base tracking-tight">{el.name}</h3>
                  <Badge
                    variant={
                      el.status === "Active"
                        ? "default"
                        : el.status === "Pending"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs shrink-0"
                  >
                    {el.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {el.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInfo(el)}
                  className="gap-1.5 text-xs h-7"
                >
                  <Eye className="size-3.5" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUser(el)}
                  className="gap-1.5 text-xs h-7"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => handleDelete(el.id)}
                  title="Delete"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddDialog open={open} setOpen={setOpen} addUser={addUser} />
      <EditDialog user={user} setUser={setUser} editUser={editUser} />
      <InfoDialog info={info} setInfo={setInfo} />
    </div>
  )
}
