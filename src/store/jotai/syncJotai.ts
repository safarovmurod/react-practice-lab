import { atom } from "jotai"
import type { SyncItem } from "@/types/sync.types"
import { initialSyncItems } from "@/utils/mockData"

export const syncJotaiAtom = atom<SyncItem[]>(initialSyncItems)
