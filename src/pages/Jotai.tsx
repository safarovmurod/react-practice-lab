import DialogJotai from "@/Components/DialogJotai"
import DialogInfo from "@/Components/DialogInfo"
import { deleteJotay, jotaiData } from "@/store/Jotai"
import { useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"

export default function Jotai() {
   const data = useAtomValue(jotaiData)
   const deleteUser = useSetAtom(deleteJotay)
   const [add, setAdd] = useState(false)
   const [user, setUser] = useState(null)
   const [info, setInfo] = useState(null)

   return (
      <div className="w-[80%] m-auto mt-15">
         <h1 className="text-5xl mb-10">Jotai</h1>
         <button onClick={() => setAdd(true)}>add</button>
         <div className="flex m-auto flex-wrap gap-5">
            <DialogJotai key={user ? user.id : "add"} open={add} setOpen={setAdd} user={user} setUser={setUser} />
            <DialogInfo user={info} setInfo={setInfo} />
            {data.map((el) => (
               <div className="border w-70 h-70 p-3" key={el.id}>
                  <h1>{el.name}</h1>
                  <img className="w-30 h-30 rounded-2xl border" src={el.img} alt="" />
                  <div className="flex gap-4 mt-10 justify-center">
                     <button onClick={() => deleteUser(el.id)} className="border p-1 w-25 rounded-xl">delete</button>
                     <button onClick={() => setUser(el)} className="border p-1 w-25 rounded-xl">edit</button>
                     <button onClick={() => setInfo(el)} className="border p-1 w-25 rounded-xl">info</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
