import { create } from 'zustand'

interface user{
   id:number
   job:string
}

interface UseLogika{
  dataZustand: user[]
  deleteUserZustand: (id: number) => void
}

export const useZustand = create<UseLogika>((set) => ({
  dataZustand: [{id:1,job:"frontend"},{id:2,job:'Bekend'}],
   deleteUserZustand: (id) =>
    set((state) => ({
      dataZustand: state.dataZustand.filter((el) => el.id !== id),
    })),
   EditUserZustand: (user) =>
    set((state) => ({
      dataZustand: state.dataZustand.map((el) => el.id === user.id?user:el),
    })),
   AddUserZustand: (user) =>
    set((state) => ({
      dataZustand: [...state.dataZustand,user],
    })),
}))