import { todoZustand } from "@/store/useZustand"
import type { IData } from "@/store/useZustand"
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export function DialogEdit({
   user,
   setUser,
}: {
   user: IData | null
   setUser: (user: IData | null) => void
}) {
   const { EditUser } = todoZustand()
   function edit(e: any) {
      e.preventDefault()
      if (!user) return
      const editobj = {
         id: user.id,
         name: e.target.name.value,
         img: e.target.img.value,
         age: e.target.age.value,
         status: e.target.status.value === "active"
      }
      EditUser(editobj)
      setUser(null)
   }
   if (!user) return null
   return (
      <Dialog open={Boolean(user)}>
         <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] gap-6 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl sm:max-w-md sm:p-8">
            <form onSubmit={edit} className="flex flex-col gap-6">
               <DialogHeader className="gap-2 text-left">
                  <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                     Edit profile
                  </DialogTitle>
               </DialogHeader>
               <FieldGroup className="gap-4">
                  <Field>
                     <Label
                        className="mb-2 text-sm font-medium text-slate-700"
                        htmlFor="username-1"
                     >
                        Username
                     </Label>
                     <Input
                        className="h-11 rounded-lg border-slate-300 bg-white px-3 text-slate-900 focus-visible:border-slate-500 focus-visible:ring-slate-200"
                        defaultValue={user.name}
                        id="username-1"
                        name="name"
                     />
                  </Field>
                  <Field>
                     <Label htmlFor="edit-img">Image URL</Label>
                     <Input id="edit-img" name="img" defaultValue={user.img} placeholder="https://..." />
                  </Field>
                  <Field>
                     <Label htmlFor="edit-age">Age</Label>
                     <Input id="edit-age" name="age" type="number" min="0" defaultValue={user.age} />
                  </Field>
                  <Field>
                     <Label htmlFor="edit-status">Status</Label>
                     <select
                        id="edit-status"
                        name="status"
                        defaultValue={ user.status ? "active" : "inactive"}
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
                     >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                     </select>
                  </Field>
               </FieldGroup>
               <DialogFooter className="m-0 gap-3 rounded-none border-0 bg-transparent p-0 sm:justify-end">
                  <Button
                     className="h-10 rounded-lg border-slate-300 bg-white px-4 text-slate-700 hover:bg-slate-100"
                     variant="outline"
                     type="button"
                     onClick={() => setUser(null)}
                  >
                     Cancel
                  </Button>
                  <Button
                     className="h-10 rounded-lg bg-slate-900 px-4 text-white hover:bg-slate-700"
                     type="submit"
                  >
                     Save changes
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
export default DialogEdit
