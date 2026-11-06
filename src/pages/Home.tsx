import { useState } from "react"
import { todoZustand } from "../store/useZustand"
import type { IData } from "../store/useZustand"
import DialogEdit from "@/components/DialogEdit"

export default function Home() {
   const { data, deleteUser } = todoZustand()
   const [user, setUser] = useState<IData | null>(null)
   return (
      <div>
         <DialogEdit user={user} setUser={setUser} />
         <div>
            {data.map((el: any) => (
               <div key={el.id}>
                  <h1>{el.name}</h1>
                  <button onClick={() => deleteUser(el.id)}>delete</button>
                  <button onClick={() => setUser(el)}>Edit</button>
               </div>
            ))}
         </div>
      </div>
   )
}
