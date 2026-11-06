import { create } from "zustand"

export interface IData {
   id: number
   name: string
}
interface TodoSlice {
   data: IData[]
   deleteUser: (id: number) => void
   EditUser: (user: IData) => void
}

export const todoZustand = create<TodoSlice>((set) => ({
   data: [
      { name: "salom", id: 1 },
      { name: "umar", id: 2 },
   ],
   deleteUser: (id: number) =>
      set((state: any) => ({
         data: state.data.filter((el: any) => el.id !== id),
      })),
   EditUser: (user: any) =>
      set((state: any) => ({
         data: state.data.map((el: any) => (el.id === user.id ? user : el)),
      })),
}))
