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
import { X } from "lucide-react"


export function DrawerDemo({ user, setUser }) {
  if (!user) {
   return null
  }
  return (
    <Drawer
      open
      swipeDirection="right"
      onOpenChange={() => setUser(null)}
    >
      <DrawerContent className="h-dvh bg-slate-900 border-slate-700/60 text-white shadow-2xl data-[swipe-axis=x]:w-full data-[swipe-axis=x]:sm:w-[420px]">
        <DrawerHeader className="flex-row items-center justify-between border-b border-slate-700/60 p-6">
          <DrawerTitle className="text-xl font-semibold text-white">info</DrawerTitle>
          <DrawerClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
            <X size={20} />
          </DrawerClose>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {user.img && <img src={user.img} alt={user.name} className="mb-6 aspect-square w-full rounded-xl object-cover" />}
          <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
          <DrawerDescription className="mt-2 text-base text-slate-400">
            {user.job}
          </DrawerDescription>
        </div>

        <DrawerFooter className="border-t border-slate-700/60 bg-slate-950/40 p-6">
          <DrawerClose render={<Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
