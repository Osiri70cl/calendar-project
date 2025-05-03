import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import useApi, { Methods } from "@/src/global/hooks/useApi";
import Loader from "@/src/icons/Loader";

import { format, isSameDay } from "date-fns";

import { fr } from "date-fns/locale";
import {
  ArrowUpRightFromSquareIcon,
  CalendarIcon,
  Link2,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      options.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

export default function ViewEventDialog({ open, onOpenChange, event }: any) {
  if (!event || !event.id) return null;
  const [isEdit, setIsEdit] = useState(false);
  const { response, error, loading, callApi } = useApi();
  const { control, handleSubmit, setValue, watch } = useFormContext();

  const formatEventDate = (date: any) => {
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  };

  const formatEventTime = (start: any, end: any) => {
    const startFormat = format(start, "HH:mm", { locale: fr });
    const endFormat = format(end, "HH:mm", { locale: fr });
    return `${startFormat} - ${endFormat}`;
  };

  useEffect(() => {
    if (!event) return;
    setValue("eventCreation.title", event.name);
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    setValue("eventCreation.startDate", startDate);
    setValue("eventCreation.endDate", endDate);
    const startTime = format(startDate, "HH:mm", { locale: fr });
    const endTime = format(endDate, "HH:mm", { locale: fr });
    setValue("eventCreation.startTime", startTime);
    setValue("eventCreation.endTime", endTime);
    setValue("eventCreation.participants", event.participants);
    setValue("eventCreation.location", event.location);
    setValue("eventCreation.link", event.link);
    setValue("eventCreation.description", event.description);
  }, [event, setValue]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      onOpenChange(false);
    }
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    onOpenChange(false);
  };

  const handleRedirectToSingleEvent = () => {
    window.location.href = `/evenements/${event.id}`;
  };

  const onSubmit = (data: any) => {
    const startDate = new Date(data.eventCreation.startDate);
    const endDate = new Date(data.eventCreation.endDate);
    if (data.eventCreation.startTime) {
      const [startHours, startMinutes] = data.eventCreation.startTime
        .split(":")
        .map(Number);
      startDate.setHours(startHours, startMinutes, 0, 0);
    }

    if (data.eventCreation.endTime) {
      const [endHours, endMinutes] = data.eventCreation.endTime
        .split(":")
        .map(Number);
      endDate.setHours(endHours, endMinutes, 0, 0);
    }

    const eventData = {
      name: data.eventCreation.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description: data.eventCreation.description,
      link: data.eventCreation.link,
      calendarId: 1,
      visibility: "PUBLIC",
    };

    callApi(Methods.PUT, `/api/events?eventId=${event.id}`, eventData);
  };

  useEffect(() => {
    if (response && response.res) {
      toast("Événement modifié");
      setValue("events", response.res);
      setValue("selectedEvent", {});
      setValue("eventCreation", {});
      onOpenChange(false);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      toast("Une erreur est survenue lors de la modification de l'événement");
      setValue("selectedEvent", {});
      setValue("eventCreation", {});
    }
  }, [error]);

  const renderEventEditForm = useMemo(() => {
    return (
      <form>
        <div className="grid gap-4 py-4">
          <FormField
            control={control}
            name="eventCreation.title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Ajoutez un titre"
                    {...field}
                    className="border-0 shadow-none text-lg focus-visible:ring-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name="eventCreation.startDate"
              render={({ field }) => {
                const [open, setOpen] = useState(false);

                return (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy", {
                                  locale: fr,
                                })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="eventCreation.startTime"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="00:00" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name="eventCreation.endDate"
              render={({ field }) => {
                const [open, setOpen] = useState(false);

                return (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy", {
                                  locale: fr,
                                })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="eventCreation.endTime"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="00:00" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="eventCreation.participants"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Ajoutez des participants"
                      className="pl-8"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="eventCreation.link"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Link2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Ajouter une réunion Zoom"
                      className="pl-8"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="eventCreation.description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ajoutez une description"
                    className="min-h-20 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    );
  }, [isEdit]);

  const renderDisplayDate = useMemo(() => {
    if (!event) return null;

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (isSameDay(startDate, endDate)) {
      return (
        <div className="text-base">{formatEventDate(event?.startDate)}</div>
      );
    } else {
      return (
        <div className="text-base">
          {formatEventDate(event?.startDate)} -{" "}
          {formatEventDate(event?.endDate)}
        </div>
      );
    }
  }, [event]);

  const renderEventInformations = useMemo(() => {
    return (
      <DialogDescription>
        <div className="mt-2 space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Date
            </div>
            {renderDisplayDate}
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Heure
            </div>
            <div className="text-base">
              {formatEventTime(event?.startDate, event?.endDate)}
            </div>
          </div>

          {event.link && (
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Lien
              </div>
              <div className="text-base">{event.link}</div>
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
          <div>
            <Button
              variant="outline"
              type="button"
              onClick={handleRedirectToSingleEvent}
            >
              Voir l'événement complet
              <ArrowUpRightFromSquareIcon />
            </Button>
          </div>
        </div>
      </DialogDescription>
    );
  }, [event]);

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{event?.name}</DialogTitle>
          {isEdit ? renderEventEditForm : renderEventInformations}
          <div className="flex justify-between mt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Annuler
            </Button>
            <div className="flex gap-2">
              {isEdit ? (
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="cursor-pointer"
                >
                  {loading ? <Loader /> : "Enregistrer les modifications"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleEdit}
                  className="cursor-pointer"
                >
                  Modification rapide
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
