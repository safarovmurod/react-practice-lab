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
import type { UserInput } from "@/data/api"
import { useFormik } from "formik"

type Props = {
   open: boolean
   setOpen: (open: boolean) => void
   AddData: (user: UserInput) => Promise<void>
}

export default function DialogAddFormik({ open, setOpen, AddData }: Props) {
   const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
      initialValues: { name: "", job: "", img: "" },
      onSubmit: async (values, { resetForm }) => {
         try {
            await AddData(values)
            resetForm()
            setOpen(false)
         } catch (error) {
            console.error(error)
         }
      },
   })

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent aria-describedby={undefined} className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl sm:max-w-md">
            <form onSubmit={handleSubmit}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-slate-900">Add User</DialogTitle>
               </DialogHeader>

               <FieldGroup className="gap-4">
                  <Field>
                     <Label htmlFor="name" className="text-slate-700">
                        name
                     </Label>
                     <Input
                        id="name"
                        name="name"
                        placeholder=" Name User"
                        value={values.name}
                        onChange={handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="job" className="text-slate-700">
                        Job
                     </Label>
                     <Input
                        id="job"
                        name="job"
                        placeholder=" Job user "
                        value={values.job}
                        onChange={handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="img" className="text-slate-700">
                        img (URL)
                     </Label>
                     <Input
                        id="img"
                        name="img"
                        placeholder=" https://example.com/photo.jpg (url-img)"
                        value={values.img}
                        onChange={handleChange}
                     />
                  </Field>
               </FieldGroup>

               <DialogFooter className="-mx-6 -mb-6 mt-6 flex justify-end gap-3 rounded-b-xl border-t border-slate-200 bg-slate-50 p-4">
                  <DialogClose
                     render={
                        <Button
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
                     Add user
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
