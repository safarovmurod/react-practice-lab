import { editUser } from "@/store/CreateSlice"
import { zustandSlice } from "@/store/Zustand"
import { useDispatch } from "react-redux"

export default function DialogEdit({user,setUser}) {
      const {EditUser} = zustandSlice((state)=>state)
   
   const dispatch = useDispatch()
   async function EditUsers(e) {
      e.preventDefault()
      const edit = {
         id:user.id,
         name:e.target.name.value,
         job:e.target.job.value,
      }
      dispatch(editUser(edit))
      EditUser(edit)
      setUser(null)
   }
   if (!user) return null
   return (
      <dialog open={Boolean(user)}>
         DialogEdit
         <form onSubmit={EditUsers} action="">
            <input className="border" defaultValue={user.name} type="text" name="name" id="" />
            <input className="border" defaultValue={user.job} type="text" name="job" id="" />
            <button type="submit">save</button>
            <button onClick={()=>setUser(null)} type="button">cancel</button>
         </form>
      </dialog>
   )
}
