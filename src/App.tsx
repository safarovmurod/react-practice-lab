import DialogAddFormik from "@/components/DialogAddFormik"
import DialogEditFormik from "@/components/DialogEditFormik"
import { api, type Idata, type UserInput } from "@/data/api"
import axios from "axios"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function App() {
   const [data, setData] = useState<Idata[]>([])
   const [open, setOpen] = useState(false)
   const [user, setUser] = useState<Idata | null>(null)

   async function getData() {
      try {
         const { data } = await axios.get<Idata[]>(api)
         setData(data)
      } catch (error) {
         console.error(error)
      }
   }

   async function AddData(values: UserInput) {
      try {
         await axios.post(api, values)
         await getData()
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   async function EditData(user: Idata) {
      try {
         await axios.put(`${api}/${user.id}`, user)
         await getData()
      } catch (error) {
         console.error(error)
         throw error
      }
   }

   async function DeleteData(id: string) {
      try {
         await axios.delete(`${api}/${id}`)
         await getData()
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <div className="min-h-screen bg-white px-5 py-8 md:px-10 md:py-12">
         <DialogAddFormik open={open} setOpen={setOpen} AddData={AddData} />
         <DialogEditFormik user={user} setUser={setUser} EditData={EditData} />

         <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Users</h1>
            <button onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 cursor-pointer">
               <Plus size={20} />
               Add Users
            </button>
         </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.map((el) => {
               return (
                  <div key={el.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                     {el.img && <img src={el.img} alt={el.name} className="mx-auto size-24 rounded-full border-4 border-white object-cover" />}
                     <h2 className="mt-4 text-lg font-semibold text-slate-900 truncate">{el.name}</h2>
                     <p className="mt-1 text-sm text-slate-500 truncate">{el.job}</p>

                     <div className="mt-5 flex gap-2 border-t border-slate-200 pt-4">
                        <button onClick={() => setUser(el)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 cursor-pointer">
                           <Pencil size={15} />
                           Edit
                        </button>
                        <button onClick={() => DeleteData(el.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer">
                           <Trash2 size={15} />
                           Delete
                        </button>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
