import { zustandSlice } from "@/store/Zustand"

export default function DialogZustand({ open, setOpen, user, setUser }) {
   const { AddUserZ, EditUser } = zustandSlice((state) => state)

   async function saveUser(e) {
      e.preventDefault()
      const newobj = {
         id: user ? user.id : Date.now(),
         name: e.target.name.value,
         job: e.target.job.value,
         img: e.target.img.value,
      }
      if (user) {
         await EditUser(newobj)
      } else {
         await AddUserZ(newobj)
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
