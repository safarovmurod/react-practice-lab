import { useState } from "react"
import { useAtom } from "jotai"
import { syncJotaiAtom } from "@/store/jotai/syncJotai"
import type { SyncItem } from "@/types/sync.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function SyncJotaiPage() {
  const [data, setData] = useAtom(syncJotaiAtom)

  function PostUser(user: SyncItem) {
    setData([...data, { ...user, id: Date.now() }])
  }

  function EditUser(user: SyncItem) {
    setData(data.map((el) => el.id === user.id ? user : el))
  }

  function handleDelete(id: number) {
    setData(data.filter((el) => el.id !== id))
  }

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SyncItem | null>(null)
  const [info, setInfo] = useState<SyncItem | null>(null)

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Sync Jotai</h1>
            <Badge variant="default" className="text-xs">Jotai</Badge>
            <Badge variant="outline" className="text-xs">Synchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Synchronous catalog powered by Jotai atomic state. Clean grid card layout.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((el) => (
          <div
            key={el.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs transition-all hover:shadow-md hover:border-primary/40"
          >

            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                src={el.img}
                alt={el.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    el.status === "Active"
                      ? "default"
                      : el.status === "Pending"
                      ? "secondary"
                      : "outline"
                  }
                  className="shadow-sm backdrop-blur-md"
                >
                  {el.status}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-xs font-mono">
                  #{el.id}
                </Badge>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold tracking-tight">{el.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {el.description}
              </p>

              <div className="mt-auto pt-5 border-t border-border/60 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInfo(el)}
                  className="flex-1 gap-1.5"
                >
                  <Eye className="size-3.5" />
                  Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUser(el)}
                  className="flex-1 gap-1.5"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="px-2.5"
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

      <AddDialog open={open} setOpen={setOpen} addUser={PostUser} />
      <EditDialog user={user} setUser={setUser} editUser={EditUser} />
      <InfoDialog info={info} setInfo={setInfo} />
    </div>
  )
}
