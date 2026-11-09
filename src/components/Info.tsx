import type { IData } from "@/store/todoAtoms"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer"

export function DrawerDemo({
   info,
   setInfo,
}: {
   info: IData | null
   setInfo: (user: IData | null) => void
}) {
   if (!info) return null

   return (
      <Drawer
         open={Boolean(info)}
         onOpenChange={(open) => {
            if (!open) setInfo(null)
         }}
         swipeDirection="right"
      >
         <DrawerContent className="overflow-y-auto bg-white text-slate-900">
            <DrawerHeader className="border-b border-slate-100 px-6 py-5 text-left">
               <DrawerTitle className="text-lg font-semibold">User details</DrawerTitle>
               <DrawerDescription>View the full name and description.</DrawerDescription>
            </DrawerHeader>
            <Card className="m-6 gap-4 border border-slate-200 bg-white ring-0">
               <CardHeader className="gap-3">
                  {info.images.length > 0 ? (
                     <Carousel
                        className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                        aria-label={`Images for ${info.name}`}
                     >
                        <CarouselContent>
                           {info.images.map((image) => (
                              <CarouselItem key={image.id}>
                                 <img
                                    src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                                    alt={info.name}
                                    className="h-60 w-full object-contain p-3"
                                 />
                              </CarouselItem>
                           ))}
                        </CarouselContent>
                        {info.images.length > 1 && (
                           <>
                              <CarouselPrevious className="left-2 size-8 border-slate-200 bg-white shadow-sm" />
                              <CarouselNext className="right-2 size-8 border-slate-200 bg-white shadow-sm" />
                           </>
                        )}
                     </Carousel>
                  ) : (
                     <CardDescription className="flex h-60 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        No images
                     </CardDescription>
                  )}
                  <CardTitle className="text-xl break-words">{info.name}</CardTitle>
                  <CardDescription>ID: {info.id}</CardDescription>
                  <Badge
                     className={
                        info.isCompleted
                           ? "bg-emerald-50 text-emerald-700"
                           : "bg-slate-100 text-slate-500"
                     }
                  >
                     {info.isCompleted ? "Active" : "Inactive"}
                  </Badge>
               </CardHeader>
               <CardContent>
                  <CardDescription className="whitespace-pre-wrap break-words leading-6 text-slate-600">
                     {info.description}
                  </CardDescription>
               </CardContent>
            </Card>
            <DrawerFooter className="border-t border-slate-100 p-6">
               <DrawerClose
                  render={
                     <Button className="h-10 w-full bg-slate-900 text-white hover:bg-slate-700">
                        Close
                     </Button>
                  }
               />
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   )
}

export default DrawerDemo
