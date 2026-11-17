import { create } from "zustand"
import type { SyncItem } from "@/types/sync.types"
import { initialSyncItems } from "@/utils/mockData"

interface SyncZustandState {
  data: SyncItem[]
  PostUser: (user: SyncItem) => void
  EditUser: (user: SyncItem) => void
  DeleteUser: (id: number) => void
}

export const useSyncZustandStore = create<SyncZustandState>((set) => ({
  data: initialSyncItems,
  PostUser: (user) => set((state) => ({ data: [...state.data, { ...user, id: Date.now() }] })),
  EditUser: (user) => set((state) => ({ data: state.data.map((el) => el.id === user.id ? user : el) })),
  DeleteUser: (id) => set((state) => ({ data: state.data.filter((el) => el.id !== id) })),
}))
