import { useEffect, useState } from "react"
import { useAtom, useSetAtom, useAtomValue } from "jotai"
import { asyncJotaiAtom, getDataAtom, loadingAtom, errorAtom, PostUserAtom, EditUserAtom, DeleteUserAtom, ChangeStatusAtom } from "@/store/jotai/asyncJotai"
import type { AsyncToDoItem } from "@/types/async.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2, CheckCircle2, Circle, Image as ImageIcon } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function AsyncJotaiPage() {
  const [data] = useAtom(asyncJotaiAtom)

  const getData = useSetAtom(getDataAtom)
  const PostUser = useSetAtom(PostUserAtom)
  const EditUser = useSetAtom(EditUserAtom)
  const DeleteUser = useSetAtom(DeleteUserAtom)
  const ChangeStatus = useSetAtom(ChangeStatusAtom)
  const loading = useAtomValue(loadingAtom)
  const requestError = useAtomValue(errorAtom)

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
            <h1 className="text-2xl font-bold tracking-tight">Async Jotai</h1>
            <Badge variant="default" className="text-xs">Jotai</Badge>
            <Badge variant="secondary" className="text-xs">Asynchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Async ToDo queue powered by Jotai atom. Interactive checklist card layout.
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

      <div className="space-y-3.5">
        {data.map((el) => {
          return (
            <div
              key={el.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-xs transition-all hover:shadow-md ${
                el.isCompleted ? "border-muted bg-muted/20" : "hover:border-primary/40"
              }`}
            >

              <div className="flex items-start gap-3.5 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {el.isCompleted ? (
                    <CheckCircle2 className="size-5 text-primary" />
                  ) : (
                    <Circle className="size-5 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{el.id}
                    </span>
                    <h3
                      className={`font-semibold text-base tracking-tight ${
                        el.isCompleted ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {el.name}
                    </h3>
                    <Badge
                      variant={el.isCompleted ? "outline" : "default"}
                      className="text-xs"
                    >
                      {el.isCompleted ? "Done" : "Pending"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {el.description}
                  </p>

                  {el.images.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <ImageIcon className="size-3.5" />
                      <span>{el.images.length} attachments</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInfo(el)}
                  className="gap-1.5 h-8 text-xs"
                >
                  <Eye className="size-3.5" />
                  Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUser(el)}
                  className="gap-1.5 h-8 text-xs"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 px-2.5"
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
