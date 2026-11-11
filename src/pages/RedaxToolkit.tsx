import DialogAdd from "@/Components/dialogAdd"
import DialogEdit from "@/Components/DialogEdit"
import DialogInfo from "@/Components/DialogInfo"
import { DeleteData, getData } from "@/store/CreateSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function RedaxToolkiy() {
   const [add, setAdd] = useState(false)
   const [user, setUser] = useState(null)
   const [info, setInfo] = useState(null)
   const dispatch = useDispatch()
   const { data, isloading } = useSelector((state) => state.data)
   useEffect(() => {
      dispatch(getData())
   }, [])
   if (isloading) {
      return (
         <div>
            <h1 className="text-5xl text-center text-blue-800 mt-30">is Jurabek....</h1>
         </div>
      )
   }
   return (
      <div className="w-[80%] m-auto mt-15">
         <button onClick={() => setAdd(true)}>add</button>
         <div className="flex m-auto flex-wrap gap-5">
            <DialogAdd setOpen={setAdd} open={add} />
            <DialogEdit user={user} setUser={setUser} />
            <DialogInfo user={info} setInfo={setInfo} />

            {data.map((el) => {
               return (
                  <div className="border w-70 h-70 p-3" key={el.id}>
                     <h1>{el.name}</h1>
                     <img className="w-30 h-30 rounded-2xl border" src={el.img} alt="" />
                     <div className="flex gap-4  mt-10 justify-center">
                        <button
                           onClick={() => dispatch(DeleteData(el.id))}
                           className="border p-1 w-25 rounded-xl"
                        >
                           delete
                        </button>
                        <button onClick={() => setUser(el)} className="border p-1 w-25 rounded-xl">
                           edit
                        </button>
                        <button onClick={() => setInfo(el)} className="border p-1 w-25 rounded-xl">
                           info
                        </button>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
