"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, isAfter, isBefore, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ArrowRight,
  Clock,
  File,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Schema for form validation
const meetingSchema = z.object({
  name: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  date: z.date({ required_error: "Veuillez sélectionner une date" }),
  time: z.string({ required_error: "Veuillez sélectionner un horaire" }),
  duration: z.number().default(30),
  message: z.string().optional(),
});

type MeetingFormValues = z.infer<typeof meetingSchema>;

// Mock data for unavailable time slots - replace with your API call
const mockUnavailableTimes = {
  "2025-05-03": ["09:00", "10:00", "14:00"],
  "2025-05-04": ["11:00", "15:30"],
  // Example of a fully booked day
  "2025-05-10": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ],
};

// Time slot generation
const generateTimeSlots = (
  startTime: number = 9, // 9 AM
  endTime: number = 18, // 6 PM
  interval: number = 30 // 30 minutes
) => {
  const slots = [];
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

// Function to check if a day is fully booked
const isDayFullyBooked = (
  date: Date,
  unavailableTimes: Record<string, string[]>
) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const unavailable = unavailableTimes[formattedDate] || [];
  const allTimeSlots = generateTimeSlots();

  // If all time slots are unavailable, the day is fully booked
  return unavailable.length >= allTimeSlots.length;
};

// Available time slots component
function TimeSlots({
  date,
  unavailableTimes,
}: {
  date: Date | null;
  unavailableTimes: Record<string, string[]>;
}) {
  const { setValue, watch } = useFormContext<MeetingFormValues>();
  const selectedTime = watch("time");

  if (!date)
    return (
      <div className="text-center py-10">
        Veuillez d'abord sélectionner une date
      </div>
    );

  const formattedDate = format(date, "yyyy-MM-dd");
  const unavailable = unavailableTimes[formattedDate] || [];
  const allTimeSlots = generateTimeSlots();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 max-h-[400px] overflow-y-auto p-2">
      {allTimeSlots.map((time) => {
        const isUnavailable = unavailable.includes(time);

        return (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            className={cn(
              "flex items-center justify-center",
              isUnavailable && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isUnavailable && setValue("time", time)}
            disabled={isUnavailable}
            type="button"
          >
            <Clock className="mr-2 h-4 w-4" />
            {time}
          </Button>
        );
      })}
    </div>
  );
}

export function MeetingScheduler() {
  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      name: "",
      email: "",
      duration: 30,
      message: "",
    },
  });

  // Reset time when date changes
  useEffect(() => {
    if (selectedDate) {
      form.setValue("date", selectedDate);
      form.setValue("time", ""); // Reset time selection
    }
  }, [selectedDate, form]);

  function onSubmit(data: MeetingFormValues) {
    setSubmitting(true);

    // Here you would send the data to your API
    console.log("Form submitted:", data);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      // Reset form or show success message
      form.reset();
      setSelectedDate(null);
      // Here you could redirect or show a success message
    }, 1500);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Demandez un rendez-vous</CardTitle>
        <CardDescription>
          Sélectionnez une date et un horaire disponible pour planifier votre
          rendez-vous.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="Votre nom"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="votre@email.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optionnel)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            className="pl-10 min-h-[120px]"
                            placeholder="Décrivez brièvement l'objet de votre rendez-vous"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6 bg-black/5 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center">
                        <File />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        Besoin de déposer des documents ?
                      </div>
                      <div className="text-sm mb-2">
                        Vous pourrez les déposer directement sur le rendez-vous
                        une fois celui-ci créé.
                      </div>
                      <div className="text-sm  flex items-start">
                        <span>
                          Pas de panique, nous vous le rappellerons dans l'email
                          de confirmation de votre rendez-vous !
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 flex justify-center">
                    <div>
                      <FormLabel className="text-base mb-2 block">
                        Sélectionnez une date
                      </FormLabel>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={fr}
                        disabled={
                          (date) =>
                            isBefore(date, startOfDay(new Date())) || // Disable dates in the past
                            isAfter(date, addDays(new Date(), 30)) || // Limit booking to 30 days ahead
                            isDayFullyBooked(date, mockUnavailableTimes) // Disable fully booked days
                        }
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4">
                    <FormLabel className="text-base mb-2 block">
                      Horaires disponibles
                      {selectedDate && (
                        <Badge variant="outline" className="ml-2">
                          {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                        </Badge>
                      )}
                    </FormLabel>

                    <FormField
                      control={form.control}
                      name="time"
                      render={() => (
                        <FormItem>
                          <TimeSlots
                            date={selectedDate}
                            unavailableTimes={mockUnavailableTimes}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>Traitement en cours...</>
              ) : (
                <>
                  Demander un rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export function GeneralMeetingComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const methods = useForm({
    defaultValues: {
      meeting: {},
    },
  });

  return (
    <FormProvider {...methods}>
      <div
        className={cn("flex flex-col gap-6 max-w-4xl mx-auto", className)}
        {...props}
      >
        <MeetingScheduler />
      </div>
    </FormProvider>
  );
}
