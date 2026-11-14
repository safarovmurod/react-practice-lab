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
import type { Idata } from "@/data/api"
import { useFormik } from "formik"

type Props = {
   user: Idata | null
   setUser: (user: Idata | null) => void
   EditData: (user: Idata) => Promise<void>
}

export default function DialogEditFormik({ user, setUser, EditData }: Props) {
   const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
      initialValues: {
         name: user?.name ?? "",
         img: user?.img ?? "",
         job: user?.job ?? "",
      },
      enableReinitialize: true,
      onSubmit: async (values) => {
         if (!user) return
         try {
            await EditData({ ...values, id: user.id })
            setUser(null)
         } catch (error) {
            console.error(error)
         }
      },
   })
   if (!user) {
      return null
   }
   return (
      <Dialog open onOpenChange={(open) => { if (!open) setUser(null) }}>
         <DialogContent aria-describedby={undefined} className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl sm:max-w-md">
            <form onSubmit={handleSubmit}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-slate-900">
                  Edit Users
                  </DialogTitle>
                
               </DialogHeader>

               <FieldGroup className="gap-4">
                  <Field>
                     <Label htmlFor="edit-name" className="text-slate-700">
                        name
                     </Label>
                     <Input
                        value={values.name}
                        onChange={handleChange}
                        id="edit-name"
                        name="name"
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-job" className="text-slate-700">
                        Job
                     </Label>
                     <Input
                        id="edit-job"
                        name="job"
                        value={values.job}
                        onChange={handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-img" className="text-slate-700">
                        Img (URL)
                     </Label>
                     <Input
                        id="edit-img"
                        name="img"
                        value={values.img}
                        onChange={handleChange}
                     />
                  </Field>
               </FieldGroup>

               <DialogFooter className="-mx-6 -mb-6 mt-6 flex justify-end gap-3 rounded-b-xl border-t border-slate-200 bg-slate-50 p-4">
                  <DialogClose
                     render={
                        <Button
                           onClick={() => setUser(null)}
                           variant="outline"
                           type="button"
                           className="h-10 border-slate-300 bg-white px-4 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        >
                           cancel
                        </Button>
                     }
                  />
                  <Button
                     type="submit"
                     disabled={isSubmitting}
                     className="h-10 bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
                  >
                     save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
