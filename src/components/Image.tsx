import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Image } from "@/types/todo.type"
import { api } from "@/utils/api"
import { useDeleteImageMutation, useGetDataQuery } from "@/store/todoSlice"
import { Trash2 } from "lucide-react"


export function CarouselDemo({img}:{img:Image[]}) {
  const [deleteImage] = useDeleteImageMutation()
  const { refetch } = useGetDataQuery()

  async function handleDeleteImage(id: number) {
    const user = await deleteImage(id)
    if (!user.error) refetch()
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {img.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-video items-center justify-center overflow-hidden p-0">
                  <img src={`${api}/images/${image.imageName}`} alt="" className="h-full w-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    className="absolute top-2 right-2"
                    aria-label="Delete image"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='ml-15 bg-amber-200 disabled:opacity-100' />
      <CarouselNext  className='mr-15 bg-amber-200'/>
    </Carousel>
  )
}
