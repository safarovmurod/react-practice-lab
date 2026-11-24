import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { deleteImage } from "@/services/todo"
import type { Image } from "@/types/todo.type"
import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"

export function CarouselDemo({ img }: { img: Image[] }) {
  const queryClient = useQueryClient()
  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

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
                    onClick={() => deleteImageMutation.mutate(image.id)}
                  >
                    <Trash2 />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-15 bg-amber-200 disabled:opacity-100" />
      <CarouselNext className="mr-15 bg-amber-200" />
    </Carousel>
  )
}
