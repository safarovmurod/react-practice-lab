import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addDataAtom, editDataAtom } from "@/store/useJotai"
import type { Idata, UserInput } from "@/store/useZustand"
import { useSetAtom } from "jotai"
import { useForm } from "react-hook-form"

export function DialogAddReactHookForm({ open, setOpen }) {
   const addData = useSetAtom(addDataAtom)
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = useForm<UserInput>({
      defaultValues: { name: "", job: "", img: "" },
   })

   async function onSubmit(values: UserInput) {
      try {
         await addData(values)
         reset()
         setOpen(false)
      } catch {
         return
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="bg-slate-900 border border-slate-750 border-slate-700/60 text-white sm:max-w-md shadow-2xl p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-white">Add User</DialogTitle>
               </DialogHeader>

               <FieldGroup className="space-y-4">
                  <Field>
                     <Label htmlFor="name" className="text-slate-200">
                        name
                     </Label>
                     <Input id="name" placeholder=" Name User" {...register("name")} />
                  </Field>

                  <Field>
                     <Label htmlFor="job" className="text-slate-200">
                        Job
                     </Label>
                     <Input id="job" placeholder=" Job user " {...register("job")} />
                  </Field>

                  <Field>
                     <Label htmlFor="img" className="text-slate-200">
                        img (URL)
                     </Label>
                     <Input
                        id="img"
                        placeholder=" https://example.com/photo.jpg (url-img)"
                        {...register("img")}
                     />
                  </Field>
               </FieldGroup>

               <DialogFooter className="mt-6 -mx-6 -mb-6 p-4 border-t border-slate-700/60 bg-slate-950/40 flex justify-end gap-3">
                  <DialogClose
                     render={
                        <Button
                           variant="outline"
                           type="button"
                           className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                           cancel
                        </Button>
                     }
                  />
                  <Button
                     type="submit"
                     disabled={isSubmitting}
                     className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-600/25"
                  >
                     Add user
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}

type EditProps = {
   user: Idata | null
   setUser: (user: Idata | null) => void
}

export function DialogEditReactHookForm({ user, setUser }: EditProps) {
   const editData = useSetAtom(editDataAtom)
   const {
      register,
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<UserInput>({
      values: {
         name: user?.name ?? "",
         job: user?.job ?? "",
         img: user?.img ?? "",
      },
   })

   async function onSubmit(values: UserInput) {
      if (!user) return

      try {
         await editData({ ...values, id: user.id })
         setUser(null)
      } catch {
         return
      }
   }

   if (!user) return null

   return (
      <Dialog open onOpenChange={() => setUser(null)}>
         <DialogContent className="bg-slate-900 border border-slate-700/60 text-white sm:max-w-md shadow-2xl p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-white">Edit Users</DialogTitle>
               </DialogHeader>

               <FieldGroup className="space-y-4">
                  <Field>
                     <Label htmlFor="edit-name" className="text-slate-200">
                        name
                     </Label>
                     <Input id="edit-name" {...register("name")} />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-job" className="text-slate-200">
                        Job
                     </Label>
                     <Input id="edit-job" {...register("job")} />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-img" className="text-slate-200">
                        Img (URL)
                     </Label>
                     <Input id="edit-img" {...register("img")} />
                  </Field>
               </FieldGroup>

               <DialogFooter className="mt-6 -mx-6 -mb-6 p-4 border-t border-slate-700/60 bg-slate-950/40 flex justify-end gap-3">
                  <DialogClose
                     render={
                        <Button
                           variant="outline"
                           type="button"
                           className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                           cancel
                        </Button>
                     }
                  />
                  <Button
                     type="submit"
                     disabled={isSubmitting}
                     className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25"
                  >
                     save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
