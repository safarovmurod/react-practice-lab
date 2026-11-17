import { useEffect, useState } from "react"
import { useAsyncZustandStore } from "@/store/zustand/asyncZustand"
import type { AsyncToDoItem } from "@/types/async.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2, Check, Clock } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function AsyncZustandPage() {
  const { data, getData, PostUser, EditUser, DeleteUser, ChangeStatus, loading, error: requestError } = useAsyncZustandStore()


  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getData()
  }, [getData])

  async function handleDelete(id: number) {
    setError("")
    setDeleting(true)
    try {
      await DeleteUser(id)
    } catch {
      setError("Could not delete task. Try again.")
    } finally {
      setDeleting(false)
    }
  }

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<AsyncToDoItem | null>(null)
  const [info, setInfo] = useState<AsyncToDoItem | null>(null)

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Async Zustand</h1>
            <Badge variant="default" className="text-xs bg-amber-600 hover:bg-amber-700 text-white">Zustand</Badge>
            <Badge variant="secondary" className="text-xs">Asynchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Asynchronous ToDo store powered by Zustand. Tech modern card layout.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Task
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {(error || requestError) && <p role="alert">{error || requestError}</p>}
      {!loading && !requestError && data.length === 0 && <p>No tasks yet.</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((el) => {
          const hasImage = el.images && el.images.length > 0
          const imageUrl = hasImage
            ? `https://to-dos-api.softclub.tj/images/${el.images[0].imageName}`
            : null

          return (
            <div
              key={el.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 shadow-xs transition-all hover:shadow-lg hover:border-amber-500/40"
            >
              <div>

                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    ID #{el.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      el.isCompleted
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {el.isCompleted ? (
                      <>
                        <Check className="size-3" /> Done
                      </>
                    ) : (
                      <>
                        <Clock className="size-3" /> In Progress
                      </>
                    )}
                  </span>
                </div>

                {imageUrl && (
                  <div className="mb-4 h-36 w-full overflow-hidden rounded-xl border bg-muted">
                    <img
                      src={imageUrl}
                      alt={el.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.style.display = "none"
                      }}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <h3 className="font-bold text-base tracking-tight mb-2">
                  {el.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {el.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInfo(el)}
                  className="flex-1 gap-1.5 text-xs"
                >
                  <Eye className="size-3.5" />
                  Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUser(el)}
                  className="flex-1 gap-1.5 text-xs"
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
                  disabled={deleting || loading}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <AddDialog open={open} setOpen={setOpen} addUser={PostUser} />
      <EditDialog user={user} setUser={setUser} editUser={EditUser} changeStatus={ChangeStatus} />
      <InfoDialog info={info} setInfo={setInfo} />
    </div>
  )
}
