import { addJotai, editJotai } from "@/store/Jotai"
import { useSetAtom } from "jotai"

export default function DialogJotai({ open, setOpen, user, setUser }) {
   const addUser = useSetAtom(addJotai)
   const editUser = useSetAtom(editJotai)

   async function saveUser(e) {
      e.preventDefault()
      const newobj = {
         id: user ? user.id : Date.now(),
         name: e.target.name.value,
         job: e.target.job.value,
         img: e.target.img.value,
      }
      if (user) {
         await editUser(newobj)
      } else {
         await addUser(newobj)
      }
      setOpen(false)
      setUser(null)
      e.target.reset()
   }

   if (!open && !user) return null

   return (
      <dialog open>
         <form onSubmit={saveUser} action="">
            <input type="text" name="name" defaultValue={user ? user.name : ""} />
            <input type="text" name="job" defaultValue={user ? user.job : ""} />
            <input type="text" name="img" defaultValue={user ? user.img : ""} />
            <button type="submit">{user ? "save" : "Add Users"}</button>
            <button type="button" onClick={() => {
               setOpen(false)
               setUser(null)
            }}>cancel</button>
         </form>
      </dialog>
   )
}
