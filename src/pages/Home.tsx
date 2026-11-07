import { useState } from "react"
import { todoZustand } from "../store/useZustand"
import type { IData } from "../store/useZustand"
import DialogEdit from "@/components/DialogEdit"
import DialogAdd from "@/components/DialogAdd"
import DrawerDemo from "@/components/Info"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

export default function Home() {
   const [search, setSearch] = useState("")
   const { data, deleteUser, status } = todoZustand()
   const [user, setUser] = useState<IData | null>(null)
   const [addUser, setAddUser] = useState(false)
   const [info, setInfo] = useState<IData | null>(null)

   const filterData = data.filter((el) => {
      return (
         el.name.toLowerCase().includes(search.toLowerCase()) &&
         (status === "all" ? true : status === "online" ? el.status === true : el.status === false)
      )
   })
   return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
         <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between gap-4">
               <h1 className="text-2xl font-bold text-slate-900">Users</h1>
               <InputInline search={search} setSearch={setSearch} />
               <SelectDemo/>
               <Button
                  className="bg-slate-900 text-white hover:bg-slate-700"
                  onClick={() => setAddUser(true)}
               >
                  Add user
               </Button>
            </div>
            <DialogAdd addUser={addUser} setAddUser={setAddUser} />
            <DialogEdit user={user} setUser={setUser} />
            <DrawerDemo setInfo={setInfo} info={info} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               {filterData.map((el) => (
                  <Card key={el.id} className="h-full gap-0 rounded-2xl border border-slate-200 bg-white py-0 shadow-sm ring-0 transition-shadow duration-200 hover:shadow-lg">
                     <CardHeader className="flex flex-col items-center px-6 pt-7 text-center">
                        {el.img && (
                           <img src={el.img} alt={el.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100" />
                        )}
                        <CardTitle className="mt-4 max-w-full truncate text-xl font-semibold text-slate-900">{el.name}</CardTitle>
                        <p className="text-sm text-slate-400">ID: {el.id}</p>
                     </CardHeader>
                     <CardContent className="flex flex-1 items-center justify-between gap-3 px-6 py-5 text-sm text-slate-600">
                        <span>Age: {el.age}</span>
                        <Badge className={el.status ? "rounded-full bg-emerald-50 px-3 py-1 text-emerald-700" : "rounded-full bg-slate-100 px-3 py-1 text-slate-600"}>
                           {el.status ? "Active" : "Inactive"}
                        </Badge>
                     </CardContent>
                     <CardFooter className="grid grid-cols-3 gap-2 border-t border-slate-100 px-5 py-4">
                        <Button variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-100" onClick={() => setInfo(el)}>Info</Button>
                        <Button variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-100" onClick={() => setUser(el)}>Edit</Button>
                        <Button variant="outline" className="w-full border-slate-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => deleteUser(el.id)}>Delete</Button>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   )
}

export function SelectDemo() {
   const { status, SelectUser } = todoZustand()

   return (
      <Select value={status} onValueChange={(value) => value && SelectUser(value)}>
         <SelectTrigger className="w-full max-w-48">
            <SelectValue>
               {status === "all" ? "All" : status === "online" ? "Online" : "Offline"}
            </SelectValue>
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
         </SelectContent>
      </Select>
   )
}

function InputInline({ search, setSearch }) {
   return (
      <Field orientation="horizontal">
         <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search..."
         />
      </Field>
   )
}
