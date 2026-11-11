import { addUsers } from "@/store/CreateSlice"
import { zustandSlice } from "@/store/Zustand"
import { useDispatch } from "react-redux"

export default function DialogAdd({ open, setOpen }) {
   const dispatch = useDispatch()
   const {AddUserZ} = zustandSlice((state)=>state)
   async function AddUser(e) {
      e.preventDefault()
      const newobj={
         id:Date.now(),
         name:e.target.name.value,
         job:e.target.job.value,
         img:e.target.img.value,
      }
      dispatch(addUsers(newobj))
      AddUserZ(newobj)
      setOpen(false)
      e.target.reset()

   }
   return (
      <dialog open={open}>
         <h1>dialogAdd</h1>
         <form onSubmit={AddUser} action="">
            <input type="text" name="name" id="" />
            <input type="text" name="job" id="" />
            <input type="text" name="img" id="" />
            <button type="submit">Add Users</button>
            <button onClick={()=>setOpen(false)} type="button">cancel</button>
         </form>
      </dialog>
   )
}
