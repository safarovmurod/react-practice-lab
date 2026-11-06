import { createContext, useReducer, useState } from "react"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"
import InfoUser from "./components/InfoUser"
import { data } from "./utils/data"

const initialState = {
   users: data,
   info: null,
}

function reducer(state, action) {
   switch (action.type) {
      case "post":
         return { ...state, users: [...state.users, action.payload] }
      case "edit":
         return {
            ...state,
            users: state.users.map((el) => (el.id === action.payload.id ? action.payload : el)),
            info: state.info?.id === action.payload.id ? action.payload : state.info,
         }
      case "delete":
         return {
            ...state,
            users: state.users.filter((el) => el.id !== action.payload),
         }
      case "info":
         return { ...state, info: state.users.find((el) => el.id === action.payload) || null }
      default:
         return state
   }
}

export const UserContext = createContext(null)
export default function App() {
   const [state, dispatch] = useReducer(reducer, initialState)
   const [editUser, setEditUser] = useState(null)

   return (
      <UserContext.Provider value={{ state, dispatch }}>
         <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-8">
            <div className="mx-auto max-w-6xl">
            <AddUser />
            {editUser && <EditUser key={editUser.id} user={editUser} closeEdit={() => setEditUser(null)} />}
            <InfoUser />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {state.users.map((el) => {
               return (
                  <div key={el.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                     <img
                        className="w-[72px] h-[72px] rounded-full object-cover bg-slate-100"
                        src={el.img}
                        alt=""
                     />
                     <h1 className="text-lg font-semibold mt-4 break-words">{el.name}</h1>
                     <h1 className="text-sm text-slate-500 mt-1">Age: {el.age}</h1>
                     <h1 className="mt-2 text-sm font-medium text-slate-600">{el.status ? "online" : "offline"}</h1>
                     <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">
                        <button onClick={() => dispatch({ type: "delete", payload: el.id })} className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100">delete</button>
                        <button onClick={() => setEditUser(el)} className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">edit</button>
                        <button onClick={() => dispatch({ type: "info", payload: el.id })} className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">info</button>
                     </div>
                  </div>
               )
            })}
            </div>
            </div>
         </div>
      </UserContext.Provider>
   )
}






