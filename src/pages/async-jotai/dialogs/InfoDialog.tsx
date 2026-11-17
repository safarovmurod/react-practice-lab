import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { AsyncToDoItem } from "@/types/async.types"

interface InfoDialogProps {
  setInfo: (info: AsyncToDoItem | null) => void
  info: AsyncToDoItem | null
}

export function InfoDialog({ info, setInfo }: InfoDialogProps) {
  if (!info) return null

  const imageUrl =
    info.images.length > 0
      ? `https://to-dos-api.softclub.tj/images/${info.images[0].imageName}`
      : null

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setInfo(null) }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between pr-4">
            <DialogTitle>Task Details</DialogTitle>
            <Badge variant="outline">Task #{info.id}</Badge>
          </div>
          <DialogDescription>
            API ToDo object properties and images.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {imageUrl && (
            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <img
                src={imageUrl}
                alt={info.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"
                }}
                className="h-44 w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{info.name}</h3>
              <Badge variant={info.isCompleted ? "default" : "secondary"}>
                {info.isCompleted ? "Completed" : "In Progress"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {info.description}
            </p>
          </div>

          {info.images.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Attached Images ({info.images.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {info.images.map((img) => (
                  <Badge key={img.id} variant="outline" className="text-xs font-mono">
                    {img.imageName.slice(0, 15)}...
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setInfo(null)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
