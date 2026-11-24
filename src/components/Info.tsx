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
import { getDataById } from "@/services/todo"
import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export function DrawerDemo({
   infoId,
   setInfoId,
}: {
   infoId: number
   setInfoId: (id: number | null) => void
}) {
   const { data: info, isLoading, isError } = useQuery({
      queryKey: ["todos", infoId],
      queryFn: () => getDataById(infoId),
   })

   return (
      <Drawer
         open
         onOpenChange={(open) => {
            if (!open) setInfoId(null)
         }}
         swipeDirection="right"
      >
         <DrawerContent className="bg-white text-slate-900">
            <DrawerHeader className="border-b border-slate-100 px-6 py-5 text-left">
               <DrawerTitle className="text-lg font-semibold">Task details</DrawerTitle>
               <DrawerDescription>View the full name and description.</DrawerDescription>
            </DrawerHeader>
            <div className="min-h-0 overflow-y-auto">
               {isLoading && <p className="m-6">Loading...</p>}
               {!isLoading && (isError || !info) && (
                  <p className="m-6" role="alert">Маълумот гирифта нашуд.</p>
               )}
               {info && !isError && (
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
                                          src={`${api}/images/${image.imageName}`}
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
                        <CardTitle className="break-words text-xl">{info.name}</CardTitle>
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
               )}
            </div>
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
