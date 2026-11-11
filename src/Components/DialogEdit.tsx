import { EditUserAtomik } from "@/store/Jotai"
import { useZustand } from "@/store/useZustand"
import { useAtom } from "jotai"
import { useDispatch } from "react-redux"

export default function DialogEdit({ user, setUser }) {
   const dispatch = useDispatch()
   const [, EditUserAtom] = useAtom(EditUserAtomik)
   const { EditUserZustand } = useZustand((state) => state)

   function AddUss(obj) {
      EditUserAtom(obj)
      EditUserZustand(obj)
      dispatch(EditUserRedax(obj))
   }


   function onsubmit(e) {
      e.preventDefault()
      const newobj = {
         id: user.id,
         name: e.target.name.value,
         job: e.target.job.value,
         age: e.target.age.value,
      }
      AddUss(newobj)
      setUser(null)
   }
 if (!user) {
   return null
 }

   return (
      <dialog open={user}>
         <p>dialogAdd</p>
         <form onSubmit={onsubmit} action="">
            <input type="text" defaultValue={user.name} name="name" id="" />
            <input type="text" defaultValue={user.job} name="job" id="" />
            <input type="text" defaultValue={user.age} name="age" id="" />
            <button type="submit">save</button>
            <button onClick={() => setUser(null)} type="button">
               cancel
            </button>
         </form>
      </dialog>
   )
}
