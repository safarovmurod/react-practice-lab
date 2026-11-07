import type { IData } from "@/store/useZustand"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export function DrawerDemo({ info, setInfo }: {
  info: IData | null
  setInfo: (user: IData | null) => void
}) {
  const isMobile = useIsMobile()

  if (!info) return null

  return (
    <Drawer
      open={Boolean(info)}
      onOpenChange={(open) => { if (!open) setInfo(null) }}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerContent className="overflow-hidden bg-white text-slate-900">
        <DrawerHeader className="border-b border-slate-100 px-6 py-5 text-left">
          <DrawerTitle className="text-lg font-semibold">User profile</DrawerTitle>
          <DrawerDescription>Profile details</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {info.img && (
              <img
                src={info.img}
                alt={info.name}
                className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-lg shadow-slate-300/70"
              />
            )}
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{info.name}</h2>
            <p className="mt-1 text-sm text-slate-400">User ID: {info.id}</p>
            {info.status !== undefined && (
              <Badge className={info.status ? "mt-3 bg-emerald-50 px-3 py-1 text-emerald-700" : "mt-3 bg-slate-100 px-3 py-1 text-slate-600"}>
                {info.status ? "Active" : "Inactive"}
              </Badge>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Details</p>
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">Name</span>
              <span className="font-medium text-slate-900">{info.name}</span>
            </div>
            {info.age !== undefined && (
              <div className="flex items-center justify-between border-t border-slate-200 py-3 text-sm">
                <span className="text-slate-500">Age</span>
                <span className="font-medium text-slate-900">{info.age}</span>
              </div>
            )}
            {info.status !== undefined && (
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                <span className="text-slate-500">Status</span>
                <span className="font-medium text-slate-900">{info.status ? "Active" : "Inactive"}</span>
              </div>
            )}
          </div>
        </div>

        <DrawerFooter className="border-t border-slate-100 p-6">
          <DrawerClose render={<Button className="h-11 w-full bg-slate-900 text-white hover:bg-slate-700">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerDemo
