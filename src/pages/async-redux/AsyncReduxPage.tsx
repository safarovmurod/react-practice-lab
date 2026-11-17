import * as todo from "@/store/redux/asyncReduxSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/store/redux/store"
import type { AsyncToDoItem, EditToDo } from "@/types/async.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Pencil, Trash2, CheckCircle2, Clock, Paperclip } from "lucide-react"
import { AddDialog } from "./dialogs/AddDialog"
import { EditDialog } from "./dialogs/EditDialog"
import { InfoDialog } from "./dialogs/InfoDialog"

export default function AsyncReduxPage() {
  const { data, loading, error: requestError } = useSelector((state: RootState) => state.asyncRedux)

  const dispatch = useDispatch<AppDispatch>()


  async function PostUser(values: FormData) {
    const user = await dispatch(todo.PostUser(values))
    if ("error" in user) throw new Error(user.error.message)
  }

  async function EditUser(values: EditToDo) {
    const user = await dispatch(todo.EditUser(values))
    if ("error" in user) throw new Error(user.error.message)
  }

  async function DeleteUser(values: number) {
    const user = await dispatch(todo.DeleteUser(values))
    if ("error" in user) throw new Error(user.error.message)
  }

  async function ChangeStatus(values: number) {
    const user = await dispatch(todo.ChangeStatus(values))
    if ("error" in user) throw new Error(user.error.message)
  }

  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    dispatch(todo.getData())
  }, [dispatch])

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
            <h1 className="text-2xl font-bold tracking-tight">Async Redux</h1>
            <Badge variant="default" className="text-xs bg-purple-600 hover:bg-purple-700 text-white">Redux Toolkit</Badge>
            <Badge variant="secondary" className="text-xs">Asynchronous</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Asynchronous ToDo manager synced with Redux slice. Kanban project card layout.
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((el) => {
          const hasImage = el.images && el.images.length > 0

          return (
            <div
              key={el.id}
              className="flex flex-col rounded-xl border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-purple-500/40"
            >

              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                  TASK-{el.id}
                </span>
                <Badge
                  variant={el.isCompleted ? "default" : "outline"}
                  className="gap-1 text-xs"
                >
                  {el.isCompleted ? (
                    <>
                      <CheckCircle2 className="size-3" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock className="size-3" />
                      In Progress
                    </>
                  )}
                </Badge>
              </div>

              <h3 className="font-semibold text-base tracking-tight mb-2">
                {el.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                {el.description}
              </p>

              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  {hasImage ? (
                    <span className="flex items-center gap-1 text-primary">
                      <Paperclip className="size-3.5" />
                      {el.images.length} file{el.images.length > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span>No files</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setInfo(el)}
                    className="size-7 p-0"
                    title="View Details"
                  >
                    <Eye className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUser(el)}
                    className="size-7 p-0"
                    title="Edit Task"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-7 p-0 text-destructive hover:bg-destructive/10"
                    title="Delete Task"
                    onClick={() => handleDelete(el.id)}
                    disabled={deleting || loading}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
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
