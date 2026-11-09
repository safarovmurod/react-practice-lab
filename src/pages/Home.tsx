import Dialog from "@/Components/Dialog"
import { DeleteUser, EditUser } from "@/store/CreateSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Home() {
   const { data } = useSelector((store) => store.data)
   const [edit,setEdit] = useState(null)
   const [info,setInfo] = useState(null)
   const [add,setAdd] = useState(null)
   const dispatch = useDispatch()
   return (
      <div className="w-[80%] m-auto mt-10">
         {
            edit?(<Dialog open={edit} setOpen={setEdit} mode={"edit"}/>):info?(<Dialog open={info} setOpen={setInfo} mode={'info'}/>):add?(<Dialog open={add} setOpen={setAdd} mode={'add'}/>):null
         }
        <div className="w-[94%] flex justify-between">
            <h1 className="text-4xl font-extrabold text-green-700">Practice 1 </h1>
            <button onClick={()=>setAdd(true)} className="border w-30 p-2 rounded-xl">add user</button>
        </div>
         <div className="w--[80%] flex gap-2 flex-wrap  mt-10">
            {data.map((el) => {
               return (
                  <div className="w-70 h-70 border flex flex-col items-center" key={el.id}>
                     <img className="w-[120px] h-[120px] rounded-2xl" src={el.img} alt="" />
                     <div className="mt-2">
                        <h1 className="font-medium">
                           <span className="font-mono">name:</span> {el.name}
                        </h1>
                        <p className="font-medium">
                           {" "}
                           <span className="font-mono">age:</span> {el.age}
                        </p>
                        <p className="font-medium">
                           {" "}
                           <span className="font-mono">job: </span>
                           {el.job}
                        </p>
                     </div>
                     <div className="flex gap-2 mt-4 ">
                        <button onClick={()=>dispatch(DeleteUser(el.id))} className="w-[80px] hover:text-white hover:bg-red-600 border">delete</button>
                        <button onClick={()=>setEdit(el)} className="w-[80px] hover:text-white hover:bg-green-500 border">edit</button>
                        <button onClick={()=>setInfo(el)} className="w-[80px] hover:text-white   hover:bg-blue-600 border">info</button>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

