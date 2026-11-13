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
import { useZustand } from "@/store/useZustand"
import { useFormik } from "formik"

type Props = {
   open: boolean
   setOpen: (open: boolean) => void
}

export default function DialogAddFormik({ open, setOpen }: Props) {
   const AddData = useZustand((state) => state.AddData)

   const formik = useFormik({
      initialValues: { name: "", job: "", img: "" },
      onSubmit: async (values, { resetForm }) => {
         await AddData(values)
         resetForm()
         setOpen(false)
      },
   })

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="bg-slate-900 border border-slate-750 border-slate-700/60 text-white sm:max-w-md shadow-2xl p-6">
            <form onSubmit={formik.handleSubmit}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-white">Add User</DialogTitle>
               </DialogHeader>

               <FieldGroup className="space-y-4">
                  <Field>
                     <Label htmlFor="name" className="text-slate-200">
                        name
                     </Label>
                     <Input
                        id="name"
                        name="name"
                        placeholder=" Name User"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="job" className="text-slate-200">
                        Job
                     </Label>
                     <Input
                        id="job"
                        name="job"
                        placeholder=" Job user "
                        value={formik.values.job}
                        onChange={formik.handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="img" className="text-slate-200">
                        img (URL)
                     </Label>
                     <Input
                        id="img"
                        name="img"
                        placeholder=" https://example.com/photo.jpg (url-img)"
                        value={formik.values.img}
                        onChange={formik.handleChange}
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
