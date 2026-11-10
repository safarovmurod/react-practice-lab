import { addUsers, DeleteUser, EditUsers } from "@/store/slicePractice3"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Practika3() {
   const { data3 } = useSelector((state) => state.data3)
   const dispatch = useDispatch()
   const [elem, setElem] = useState({ id: null, name: "", job: "" })
   const [info, setInfo] = useState(null)

   function handleSubmit(event) {
      event.preventDefault()
      const newUser = {
         id: elem.id ? elem.id : Date.now(),
         name: event.target.name.value,
         job: event.target.job.value,
      }
      dispatch(elem.id ? EditUsers(newUser) : addUsers(newUser))
      event.target.reset()
      setElem({ id: null, name: "", job: "" })
   }

   function handleEdit(user) {
      setElem(user)
      setInfo(null)
   }
   return (
      <div>
         Practika3
         <form key={elem.id ? elem.id : "add"} onSubmit={handleSubmit} action="">
            {info ? (
               <div>
                  <h1>{info.name}</h1>
                  <p>{info.job}</p>
               </div>
            ) : (
               <>
                  <input className="border p-[2px]" type="text" name="name" defaultValue={elem.name} />
                  <input className="border p-[2px]" type="text" name="job" defaultValue={elem.job} />
                  <button className="border p-1" type="submit">{elem.id ? "save" : "add"}</button>
               </>
            )}
            {(elem.id || info) && (
               <button className="border p-1" type="button" onClick={() => {
                  setElem({ id: null, name: "", job: "" })
                  setInfo(null)
               }}>cancel</button>
            )}
         </form>
         <div>
            {data3.map((el) => {
               return (
                  <div className="w-50 border mt-10" key={el.id}>
                     <h1>{el.name}</h1>
                     <p>{el.job}</p>
                    <div className="flex gap-5 ">
                        <button className="border p-1 mb-1" onClick={() => {
                           setInfo(el)
                           setElem({ id: null, name: "", job: "" })
                        }}>info</button>
                        <button className="border p-1 mb-1" onClick={() => dispatch(DeleteUser(el.id))}>delete</button>
                        <button className="border p-1 mb-1" onClick={() => handleEdit(el)}>edit</button>
                    </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
