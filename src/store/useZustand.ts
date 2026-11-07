import { create } from "zustand"

export interface IData {
   id: number
   name: string
   img?: string
   age?: number
   status?: boolean
}
interface TodoSlice {
   data: IData[]
   deleteUser: (id: number) => void
   EditUser: (user: IData) => void
   AddUser: (user: IData) => void
   SearchUser: (value: string) => void
   SelectUser: (value: string) => void
   search: string
   status:string
}

export const todoZustand = create<TodoSlice>((set) => ({
   data: [
      { id: 1, name: "salom", img: "https://randomuser.me/api/portraits/men/1.jpg", age: 24, status: true },
      { id: 2, name: "umar", img: "https://randomuser.me/api/portraits/men/2.jpg", age: 27, status: true },
      { id: 3, name: "Ali", img: "https://randomuser.me/api/portraits/men/3.jpg", age: 22, status: false },
      { id: 4, name: "Madina", img: "https://randomuser.me/api/portraits/women/4.jpg", age: 25, status: true },
      { id: 5, name: "Farid", img: "https://randomuser.me/api/portraits/men/5.jpg", age: 29, status: false },
      { id: 6, name: "Zarina", img: "https://randomuser.me/api/portraits/women/6.jpg", age: 23, status: true },
      { id: 7, name: "Rustam", img: "https://randomuser.me/api/portraits/men/7.jpg", age: 31, status: true },
      { id: 8, name: "Malika", img: "https://randomuser.me/api/portraits/women/8.jpg", age: 26, status: false },
      { id: 9, name: "Said", img: "https://randomuser.me/api/portraits/men/9.jpg", age: 28, status: true },
      { id: 10, name: "Nilufar", img: "https://randomuser.me/api/portraits/women/10.jpg", age: 21, status: true },
   ],
   search:'',
   status:'all',
   deleteUser: (id: number) =>
      set((state) => ({
         data: state.data.filter((el) => el.id !== id),
      })),
   EditUser: (user) =>
      set((state) => ({
         data: state.data.map((el) => (el.id === user.id ? user : el)),
      })),
   AddUser: (user) =>
      set((state) => ({
         data: [...state.data,user],
      })),
   SearchUser:(value:string)=>set({search:value}),
   SelectUser:(value:string)=>set({status:value})
}))
