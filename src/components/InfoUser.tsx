import { useContext } from "react"
import { UserContext } from "../App"

export default function InfoUser() {
   const { state, dispatch } = useContext(UserContext)

   if (!state.info) return null

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
         <dialog open className="relative m-0 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-3">
               <img className="w-[80px] h-[80px] rounded-full object-cover bg-slate-100" src={state.info.img} alt="" />
               <h1>{state.info.name}</h1>
               <h1>Age: {state.info.age}</h1>
               <h1>{state.info.status ? "online" : "offline"}</h1>
               <button className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => dispatch({ type: "info", payload: null })}>Close</button>
            </div>
         </dialog>
      </div>
   )
}

