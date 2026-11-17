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
import type { SyncItem } from "@/types/sync.types"

interface InfoDialogProps {
  setInfo: (info: SyncItem | null) => void
  info: SyncItem | null
}

export function InfoDialog({ info, setInfo }: InfoDialogProps) {
  if (!info) return null

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setInfo(null) }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between pr-4">
            <DialogTitle>Product Information</DialogTitle>
            <Badge variant="outline">ID: #{info.id}</Badge>
          </div>
          <DialogDescription>
            Detailed view of the selected product record.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {info.img && (
            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <img
                src={info.img}
                alt={info.name}
                className="h-48 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{info.name}</h3>
              <Badge
                variant={
                  info.status === "Active"
                    ? "default"
                    : info.status === "Pending"
                    ? "secondary"
                    : "outline"
                }
              >
                {info.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {info.description}
            </p>
          </div>
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
