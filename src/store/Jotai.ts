import { atom } from "jotai"

export interface User{
   id: number,
   name: string
}

export const dataAtom = atom<User[]>([
   { id: 1, name: "sulton Mahmud" },
   { id: 2, name: "forever" },
])

// interface functiontype{
//    DeleteUsertomik:()
// }

export const DeleteUsertomik = atom(null, (get, set, id: number) => {
   set(dataAtom,get(dataAtom).filter((el) => el.id !== id))
})

export const EditUserAtomik = atom(null,(get, set, user) => {
   set(dataAtom,get(dataAtom).map((el)=>el.id===user.id?user:el))
})

export const AddUserAtomik = atom(null, (get, set, user: User) => {
  set(dataAtom, [user, ...get(dataAtom)])
})

