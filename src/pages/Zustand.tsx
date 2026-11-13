import { Pencil, Trash2, Plus, Info } from "lucide-react"
import { useEffect, useState } from "react"
import DialogAddFormik from "@/components/DialogAddFormik"
import DialogEditFormik from "@/components/DialogEditFormik"
import { useZustand, type Idata } from "@/store/useZustand"
import { DrawerDemo } from "@/components/DialogInfo"

export default function Zustand() {
   const { data, getData, DeleteData } = useZustand((state) => state)
   const [open, setOpen] = useState(false)
   const [user, setUser] = useState<Idata | null>(null)
   const [info, setInfo] = useState<Idata | null>(null)


   useEffect(() => {
      getData()
   }, [getData])

   return (
      <>
         <DialogAddFormik open={open} setOpen={setOpen} />
         <DialogEditFormik user={user} setUser={setUser} />
         <DrawerDemo user={info} setUser={setInfo}/>
         <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
            <div>
               <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Users</h1>
            </div>
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/25 cursor-pointer">
               <Plus size={20} />
               Add Users
            </button>
         </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.map((el) => {
               return (
                  <div key={el.id} className="group bg-slate-800/60 backdrop-blur border border-slate-700/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-slate-900/50 hover:border-slate-600/60 transition-all duration-300">
                     <div className="p-4">
                        <img src={el.img || undefined} alt={el.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                        <h2 className="text-lg font-semibold text-white truncate">{el.name}</h2>
                        <p className="text-slate-400 text-sm mt-0.5 truncate">{el.job}</p>
                        <div className="flex gap-2 mt-4">
                           <button onClick={()=>setInfo(el)} className="flex-1 flex items-center justify-center gap-1.5 bg-slate-700/60 hover:bg-cyan-600 text-slate-300 hover:text-white py-2 rounded-lg text-sm font-medium transition-all cursor-pointer">
                              <Info size={15} />
                              info
                           </button>
                           <button onClick={() => setUser(el)} className="flex-1 flex items-center justify-center gap-1.5 bg-slate-700/60 hover:bg-blue-600 text-slate-300 hover:text-white py-2 rounded-lg text-sm font-medium transition-all cursor-pointer">
                              <Pencil size={15} />
                              Edit
                           </button>
                           <button
                              onClick={() => DeleteData(el.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-700/60 hover:bg-red-600 text-slate-300 hover:text-white py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
                           >
                              <Trash2 size={15} />
                              delet
                           </button>
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </>
   )
}
