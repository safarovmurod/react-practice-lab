import { useDispatch, useSelector } from "react-redux"
import { useAtom } from "jotai"
import { dataAtom, DeleteUsertomik } from "./store/Jotai"
import { useZustand } from "./store/useZustand"
import { deleteUserRedax } from "./store/ReadaxToolkit"
import { useState } from "react"
import DialogAdd from "./Components/DialogAdd"
import DialogEdit from "./Components/DialogEdit"
import { DrawerDemo } from "./Components/DraverInfo"

export default function App() {
   //add
   const [add, setAdd] = useState(false)
   //edit
   const [user, setUser] = useState(null)
   //info
   const [info, setInfo] = useState(null)
   //search
   const [search, setSearch] = useState("")
   //select
   const [select, setSelect] = useState("")
   // rtk
   const { dataRedax } = useSelector((store) => store.data)
   const dispatch = useDispatch()
   // atom
   const [data] = useAtom(dataAtom)
   const [, DeleteUserAtom] = useAtom(DeleteUsertomik)
   //zustand
   const { dataZustand, deleteUserZustand } = useZustand((state) => state)
   //data
   const mixData = data.map((el) => {
      const R = dataRedax.find((e) => e.id == el.id)
      const Z = dataZustand.find((e) => e.id == el.id)
      return { ...el, ...R, ...Z }
   })
   const filter = mixData.filter((el) => {
      const name = el.name?.toLowerCase().includes(search.toLowerCase())
      const status = select === "online" ? el.status : select === "offlien" ? !el.status : true
      return name && status
   })
   //delet
   function Deleteser(id) {
      dispatch(deleteUserRedax(id))
      deleteUserZustand(id)
      DeleteUserAtom(id)
   }
   return (
      <div>
         <div className="flex gap-2 p-2">
            <DrawerDemo open={info} setOpen={setInfo} />
            <DialogAdd open={add} setOpen={setAdd} />
            <DialogEdit user={user} setUser={setUser} />
            <button onClick={() => setAdd(true)} className="border p-1">
               add
            </button>
            <input  type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-1"/>
            <select value={select} onChange={(e) => setSelect(e.target.value)} className="border p-1" >
               <option value="All">All</option>
               <option value="online">online</option>
               <option value="offlien">offline</option>
            </select>
         </div>
         {filter.map((el) => {
            return (
               <div className="w-70 h-70 border " key={el.id}>
                  <h1>{el.name}</h1>
                  <p>{el.job}</p>
                  <p>{el.age}</p>
                  <p>{el.status ? "online" : "offline"}</p>
                  <button onClick={() => Deleteser(el.id)} className="border p-1 rounded-xl">
                     deleteUsers
                  </button>
                  <button onClick={() => setUser(el)} className="border p-1 rounded-xl">
                     Edit User
                  </button>
                  <button onClick={()=>setInfo(el)}>info</button>
               </div>
            )
         })}
      </div>
   )
}
