import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "./ui/drawer"
export function DrawerDemo({ open, setOpen }) {
   if (!open) {
      return null
   }
   return (
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="down">
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Info</DrawerTitle>
               <DrawerDescription>
                  <h1>{open.name}</h1>
                  <h1>{open.job}</h1>
                  <h1>{open.age}</h1>
               </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
               <button
                  onClick={() => setOpen(false)}
                  className="h-[34px] rounded bg-primary px-4 text-primary-foreground"
               >
                  Confirm Delivery Time
               </button>
               <DrawerClose
                  render={<button className="h-[34px] rounded border px-4">Cancel</button>}
               />
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   )
}
