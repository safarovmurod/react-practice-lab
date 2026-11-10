import { addUsers } from "@/store/slicePractice2"
import { useDispatch } from "react-redux"

export default function DialogAdd({add,setAdd}) {
   const dispatch = useDispatch()
   function addUser(e) {
      e.preventDefault()
      const newobj={
         id:Date.now,
         name:e.target.name.value
      }
      dispatch(addUsers(newobj))
      setAdd(false)
   }
  return (
    
      <dialog open={add}>
         <form onSubmit={addUser} action="">
            <input type="text" name="name" id="" />
            <button type="submit">add user</button>
            <button type="button" onClick={()=>setAdd(false)}>cancel</button>
         </form>
      </dialog>
  )
}