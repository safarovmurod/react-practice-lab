import DialogAdd from "@/Components/practicadialog/DialogAdd"
import DialogEdit from "@/Components/practicadialog/DialogEdit"
import DialogInfo from "@/Components/practicadialog/DialogInfo"
import { DeleteUser } from "@/store/slicePractice2"
import type { RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Practika2() {
   const { data2 } = useSelector((state: RootState) => state.data2)
   const dispatch = useDispatch()
   const [add,setAdd]= useState(false)
   const [edit,setEdit]= useState<{ id: number; name: string } | null>(null)
   const [info,setInfo] = useState(null)
   return (
      <div>
         Practika2
         <button onClick={()=>setAdd(true)}>add</button>
         <div>
            <DialogAdd add={add} setAdd={setAdd}/>
            <DialogEdit  user={edit} setEdit={setEdit}/>
            <DialogInfo user={info} setInfo={setInfo}/>
            {data2.map((el) => {
               return (
                  <div className="border p-2 w-70 mt-7" key={el.id}>
                     <h1>{el.name}</h1>
                     <button className="border p-1 " onClick={() => setInfo(el)}>info</button>
                     <button className="border p-1 " onClick={() => setEdit(el)}>edit</button>
                     <button className="border p-1 " onClick={()=>dispatch(DeleteUser(el.id))}>delete</button>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
