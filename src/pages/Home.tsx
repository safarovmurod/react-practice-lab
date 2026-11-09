import { useState } from "react"
import { Plus, Info, Pencil, Trash2 } from "lucide-react"
import { useAtomValue, useSetAtom } from "jotai"
import { dataAtom, DeleteUserAtom, DeleteImageAtom, ChangeStatusAtom } from "@/store/todoAtoms"
import type { IData } from "@/store/todoAtoms"
import DialogAdd from "@/components/DialogAdd"
import DialogEdit from "@/components/DialogEdit"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel"
import DrawerDemo from "@/components/Info"

export default function Home() {
   const [addUser, setAddUser] = useState(false)
   const [user, setUser] = useState<IData | null>(null)
   const [info, setInfo] = useState<IData | null>(null)

   const data = useAtomValue(dataAtom)
   const DeleteUser = useSetAtom(DeleteUserAtom)
   const DeleteImage = useSetAtom(DeleteImageAtom)
   const ChangeStatus = useSetAtom(ChangeStatusAtom)


   
   return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
         <section className="mx-auto max-w-6xl space-y-7" aria-label="Users">
            <Card className="gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-0 sm:flex-row sm:items-center sm:justify-between sm:p-6">
               <CardHeader className="flex min-w-0 flex-1 flex-col gap-1 p-0">
                  <CardTitle className="text-2xl font-semibold tracking-tight">Users</CardTitle>
               </CardHeader>
               <CardContent className="flex flex-wrap items-center gap-3 p-0">
                  <Button
                     className="h-10 flex-1 gap-2 bg-slate-900 px-4 text-white hover:bg-slate-700 sm:flex-none"
                     onClick={() => setAddUser(true)}
                  >
                     <Plus /> Add user
                  </Button>
               </CardContent>
            </Card>

            <DialogAdd addUser={addUser} setAddUser={setAddUser} />
            <DialogEdit user={user} setUser={setUser} />

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="User cards">
               {data.map((el) => (
                  <Card
                     key={el.id}
                     className="min-w-0 gap-0 rounded-2xl border border-slate-200 bg-white py-0 shadow-sm ring-0"
                  >
                     <CardContent className="p-4 pb-0">
                        {el.images.length > 0 ? (
                           <Carousel
                              className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                              aria-label={`Images for ${el.name}`}
                           >
                              <CarouselContent>
                                 {el.images.map((image) => (
                                    <CarouselItem key={image.id}>
                                       <img
                                          src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                                          alt={el.name}
                                          className="h-60 w-full object-contain p-3"
                                       />
                                       <Button
                                          type="button"
                                          variant="destructive"
                                          className="mx-3 mb-3"
                                          onClick={() => DeleteImage(image.id)}
                                       >
                                          <Trash2 /> Delete image
                                       </Button>
                                    </CarouselItem>
                                 ))}
                              </CarouselContent>
                              {el.images.length > 1 && (
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
                     </CardContent>
                     <CardHeader className="gap-3 px-5 pt-5 pb-2">
                        <CardDescription className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                           <Badge
                              render={<Button type="button" variant="ghost" />}
                              onClick={() => ChangeStatus(el.id)}
                              className={
                                 el.isCompleted
                                    ? "border-0 bg-emerald-50 px-2.5 py-1 text-emerald-700"
                                    : "border-0 bg-slate-100 px-2.5 py-1 text-slate-500"
                              }
                           >
                              {el.isCompleted ? "Active" : "Inactive"}
                           </Badge>
                        </CardDescription>
                        <CardTitle className="truncate text-lg font-semibold" title={el.name}>
                           {el.name}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="flex-1 px-5 pb-5">
                        <CardDescription className="line-clamp-2 min-h-10 leading-5  text-slate-500">
                           {el.description}
                        </CardDescription>
                     </CardContent>
                     <CardFooter className="grid grid-cols-3 gap-2 border-slate-100 bg-slate-50/60 p-4">
                        <Button
                           variant="outline"
                           className="h-10 gap-1.5 border-slate-200 bg-white"
                           onClick={() => setInfo(el)}
                        >
                           <Info /> Info
                        </Button>
                        <Button
                           variant="outline"
                           className="h-10 gap-1.5 border-slate-200 bg-white"
                           onClick={() => setUser(el)}
                        >
                           <Pencil /> Edit
                        </Button>
                        <Button
                           variant="outline"
                           className="h-10 gap-1.5 border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                           onClick={() => DeleteUser(el.id)}
                        >
                           <Trash2 /> Delete
                        </Button>
                     </CardFooter>
                  </Card>
               ))}
            </section>
            {data.length === 0 && (
               <Card className="border border-dashed border-slate-300 bg-white py-12 text-center ring-0">
                  <CardDescription className="text-slate-500">No users to display.</CardDescription>
               </Card>
            )}

            <DrawerDemo info={info} setInfo={setInfo} />
         </section>
      </main>
   )
}

