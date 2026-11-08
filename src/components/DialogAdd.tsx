import { todoZustand } from "@/store/useZustand"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { FieldDescription, FieldLabel } from "@/components/ui/field"

export function DialogAdd({
   addUser,
   setAddUser,
}: {
   addUser: boolean
   setAddUser: (open: boolean) => void
}) {
   const { PostUser } = todoZustand()
   async function add(e: any) {
      e.preventDefault()
      let formdata = new FormData()
      formdata.append("Name", e.target.Name.value)
      formdata.append("Description", e.target.Description.value)
      for (let i = 0; i < e.target.images.files.length; i++) {
         formdata.append("Images", e.target.images.files[i])
      }

      await PostUser(formdata)
      setAddUser(false)
   }
   return (
      <Dialog open={addUser} onOpenChange={setAddUser}>
         <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] gap-6 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl sm:max-w-md sm:p-8">
            <form onSubmit={add} className="flex flex-col gap-6">
               <DialogHeader className="gap-2 text-left">
                  <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                     Add user
                  </DialogTitle>
               </DialogHeader>
               <FieldGroup className="gap-4">
                  <Field>
                     <Label htmlFor="add-name">Name</Label>
                     <Input id="add-name" name="Name" type="text" />
                  </Field>
                  <Field>
                     <Label htmlFor="add-description">Description</Label>
                     <Input
                        className="outline-none"
                        id="add-description"
                        name="Description"
                        type="text"
                     />
                  </Field>
                  <Field>
                     <InputFile />
                  </Field>
               </FieldGroup>
               <DialogFooter className="m-0 gap-3 rounded-none border-0 bg-transparent p-0 sm:justify-end">
                  <Button
                     className="h-10 rounded-lg border-slate-300 bg-white px-4 text-slate-700 hover:bg-slate-100"
                     variant="outline"
                     type="button"
                     onClick={() => setAddUser(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     className="h-10 rounded-lg bg-slate-900 px-4 text-white hover:bg-slate-700"
                     type="submit"
                  >
                     Save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export function InputFile() {
   return (
      <Field>
         <FieldLabel htmlFor="picture">Picture</FieldLabel>
         <Input id="picture" name="images" type="file" multiple />
         <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
   )
}

export default DialogAdd
