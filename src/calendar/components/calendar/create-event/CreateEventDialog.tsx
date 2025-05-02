"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Link2, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
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

export default function CreateEventDialog({ open, onOpenChange }: any) {
  const { control, handleSubmit, setValue, watch } = useFormContext();
  const { response, error, loading, callApi } = useApi();

  useEffect(() => {
    setValue("eventCreation.startDate", watch("selectedEvent.startDate"));
    setValue("eventCreation.endDate", watch("selectedEvent.endDate"));
    setValue(
      "eventCreation.startTime",
      watch("selectedEvent.startTime") || "00:00"
    );
    setValue(
      "eventCreation.endTime",
      watch("selectedEvent.endTime") || "23:00"
    );
  }, [watch("selectedEvent"), setValue]);

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

    const event = {
      name: data.eventCreation.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description: data.eventCreation.description,
      link: data.eventCreation.link,
      calendarId: 1,
      visibility: "PUBLIC",
    };

    callApi(Methods.POST, "/api/events", event);

    onOpenChange(false);
  };

  useEffect(() => {
    if (response && response.res) {
      toast("Événement créé");
      setValue("events", response.res);
      setValue("selectedEvent", {});
      setValue("eventCreation", {});
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      toast("Une erreur est survenue lors de la création de l'événement");
      setValue("selectedEvent", {});
      setValue("eventCreation", {});
    }
  }, [error]);

  const handleClose = () => {
    setValue("selectedEvent", {});
    setValue("eventCreation", {});
    onOpenChange(false);
  };

  const handleDialogClose = () => {
    setValue("selectedEvent", {});
    setValue("eventCreation", {});
  };

  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState) {
      handleDialogClose();
    }
    onOpenChange(newOpenState);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Créer un nouvel événement
          </DialogTitle>
        </DialogHeader>
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
              name="eventCreation.location"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Ajoutez un lieu"
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
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                type="button"
                onClick={handleClose}
              >
                Annuler
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Enregistrer"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
