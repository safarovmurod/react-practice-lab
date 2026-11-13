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
import { useZustand, type Idata } from "@/store/useZustand"
import { useFormik } from "formik"

type Props = {
   user: Idata | null
   setUser: (user: Idata | null) => void
}

export default function DialogEditFormik({ user, setUser }: Props) {
   const {EditData}= useZustand((state)=>state)
   const formik = useFormik({
      initialValues: {
         name: user?.name ?? "",
         img: user?.img ?? "",
         job: user?.job ?? "",
      },
      enableReinitialize: true,
      onSubmit: async(el) => {
        if (!user) return
        await EditData({...el, id:user.id})
        setUser(null)
      },
   })
   if (!user) {
      return null
   }
   return (
      <Dialog open>
         <DialogContent className="bg-slate-900 border border-slate-700/60 text-white sm:max-w-md shadow-2xl p-6">
            <form onSubmit={formik.handleSubmit}>
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-semibold text-white">
                  Edit Users
                  </DialogTitle>
                
               </DialogHeader>

               <FieldGroup className="space-y-4">
                  <Field>
                     <Label htmlFor="edit-name" className="text-slate-200">
                        name
                     </Label>
                     <Input
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        id="edit-name"
                        name="name"
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-job" className="text-slate-200">
                        Job
                     </Label>
                     <Input
                        id="edit-job"
                        name="job"
                        value={formik.values.job}
                        onChange={formik.handleChange}
                     />
                  </Field>

                  <Field>
                     <Label htmlFor="edit-img" className="text-slate-200">
                        Img (URL)
                     </Label>
                     <Input
                        id="edit-img"
                        name="img"
                        value={formik.values.img}
                        onChange={formik.handleChange}
                     />
                  </Field>
               </FieldGroup>

               <DialogFooter className="mt-6 -mx-6 -mb-6 p-4 border-t border-slate-700/60 bg-slate-950/40 flex justify-end gap-3">
                  <DialogClose
                     render={
                        <Button
                           onClick={() => setUser(null)}
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
