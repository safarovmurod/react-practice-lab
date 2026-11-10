import { EditUsers } from "@/store/slicePractice2"
import { useDispatch } from "react-redux"

export default function DialogEdit({ user, setEdit }) {
   const dispatch = useDispatch()
   function editUser(e: any) {
      e.preventDefault()
      const editobj = {
         id: user.id,
         name: e.target.name.value,
      }
      dispatch(EditUsers(editobj))
      setEdit(null)
   }

   if (!user) return null

  return (
      <dialog open>
         <form onSubmit={editUser} action="">
            <input type="text" name="name" defaultValue={user.name} />
            <button type="submit">save</button>
            <button type="button" onClick={() => setEdit(null)}>cancel</button>
         </form>
      </dialog>
  )
}
