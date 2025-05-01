import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ViewEventDialog({ open, onOpenChange, event }: any) {
  console.log(event);
  if (!event) return null;

  const formatEventDate = (date: any) => {
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  };

  const formatEventTime = (start: any, end: any) => {
    const startFormat = format(start, "HH:mm", { locale: fr });
    const endFormat = format(end, "HH:mm", { locale: fr });
    return `${startFormat} - ${endFormat}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.name}</DialogTitle>
          <DialogDescription>
            <div className="mt-2 space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Date
                </div>
                <div className="text-base">
                  {formatEventDate(event.startDate)}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Heure
                </div>
                <div className="text-base">
                  {formatEventTime(event.startDate, event.endDate)}
                </div>
              </div>

              {event.location && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Lieu
                  </div>
                  <div className="text-base">{event.location}</div>
                </div>
              )}

              {event.description && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Description
                  </div>
                  <div className="text-base">{event.description}</div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
