import { AddUser, EditUser } from "@/store/CreateSlice"
import { useDispatch } from "react-redux"

export default function Dialog({ open, setOpen,mode }) {
   const dispatch = useDispatch()
   function dialogAll(e) {
      e.preventDefault()
      if (mode==='edit') {
         const editobj = {
            id: open.id,
            name: e.target.name.value,
            img: e.target.img.value,
            job: e.target.job.value,
            age: e.target.age.value,
         }
         dispatch(EditUser(editobj))
      }
      if (mode==='add') {
         const newobj = {
            id: Date.now(),
            name: e.target.name.value,
            img: e.target.img.value,
            job: e.target.job.value,
            age: e.target.age.value,
         }
         dispatch(AddUser(newobj))
      }
      setOpen(null)
   }
   if (!open) return null

   return (
      <div className="w-[300px] m-auto absolute bg-amber-400 top-90 left-180">
         {
            mode==="info"?<div>
               <img src={open.img} alt="" />
               <h1>{open.name}</h1>
               <h1>{open.age}</h1>
               <h1>{open.job}</h1>
               <button onClick={()=>setOpen(null)}>cancel</button>
            </div>:
            
         <dialog className="w-[300px]   m-auto absolute bg-blue-400  top-1 left-10" open>
            <h1>{mode==='edit'?"Edit User":"Add User"}</h1>
            <form className="flex flex-col bg-amber-400" onSubmit={dialogAll} action="">
               <input className="border p-1" type="text" defaultValue={mode==='edit'?open.name:''} name="name" id="" />
               <input className="border p-1" type="text" defaultValue={mode==='edit'?open.img:''} name="img" id="" />
               <input className="border p-1" type="text" defaultValue={mode==='edit'?open.job:''} name="job" id="" />
               <input className="border p-1" type="text" defaultValue={mode==='edit'?open.age:''} name="age" id="" />
               <button className="border">{mode==='edit'?"save":"add"}</button>
               <button className="border" onClick={()=>setOpen(null)}>cancel</button>
            </form>
         </dialog>
         } 
      </div>
   )
}
