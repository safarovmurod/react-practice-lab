import { AddUserAtomik } from "@/store/Jotai"
import { useZustand } from "@/store/useZustand"
import { useAtom } from "jotai"
import { useDispatch } from "react-redux"

export default function DialogAdd({ open, setOpen }) {
   const dispatch = useDispatch()
   const [, AddUserAtom] = useAtom(AddUserAtomik)
   const { AddUserZustand } = useZustand((state) => state)

   function AddUss(obj) {
      AddUserAtom(obj)
      AddUserZustand(obj)
      dispatch(AddUserRedax(obj))
      setOpen(false)
   }


   function onsubmit(e) {
      e.preventDefault()
      const newobj = {
         id: Date.now(),
         name: e.target.name.value,
         job: e.target.job.value,
         age: e.target.age.value,
      }
      AddUss(newobj)
      setOpen(false)
   }
   return (
         <dialog open={open}>
            <p>dialogAdd</p>
            <form onSubmit={onsubmit} action="">
               <input className="border" type="text" name="name" id="" />
               <input className="border" type="text" name="job" id="" />
               <input className="border" type="text" name="age" id="" />
               <button type="submit">save</button>
               <button onClick={() => setOpen(false)} type="button">
                  cancel
               </button>
            </form>
         </dialog>
      )
}
