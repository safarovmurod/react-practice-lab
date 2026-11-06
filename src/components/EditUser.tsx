import { useContext } from "react"
import { UserContext } from "../App"
export default function EditUser({ user, closeEdit }) {
   const { dispatch } = useContext(UserContext)

   function editUser(e) {
      e.preventDefault()
      const updatedUser = {
         id: user.id,
         name: e.target.elements.name.value,
         img: e.target.elements.img.value,
         age: Number(e.target.elements.age.value),
         status: e.target.elements.status.value === "true",
      }
      dispatch({ type: "edit", payload: updatedUser })
      closeEdit()
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
         <dialog open className="relative m-0 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <form onSubmit={editUser} className="flex flex-col gap-3">
               <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500" name="name" placeholder="Name" defaultValue={user.name} required />
               <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500" name="img" placeholder="Image URL" defaultValue={user.img} />
               <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500" type="number" min="0" name="age" placeholder="Age" defaultValue={user.age} required />
               <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500" name="status" defaultValue={String(user.status)}>
                  <option value="true">online</option>
                  <option value="false">offline</option>
               </select>
               <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700" type="submit">Save</button>
               <button className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button" onClick={closeEdit}>Cancel</button>
            </form>
         </dialog>
      </div>
   )
}


