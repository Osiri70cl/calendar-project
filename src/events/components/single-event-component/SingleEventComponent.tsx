"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generateTimeOptions } from "../../utils/GenerateHours";
import EventFormEditor from "./event-editor-mode/EventFormEditor";
import EventViewMode from "./event-view-mode/EventViewMode";

const timeOptions = generateTimeOptions();

export function SingleEventComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const methods = useForm<any>({
    defaultValues: {
      title: "Team Planning Session",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      description:
        "Quarterly planning session to review goals and set priorities for the upcoming quarter.",
      location: "Conference Room A",
      link: "https://zoom.us/j/123456789",
      participants: [
        { email: "john.doe@example.com" },
        { email: "jane.smith@example.com" },
      ],
      files: [
        {
          name: "quarterly-goals.pdf",
          size: "1.2 MB",
          type: "application/pdf",
          url: "/files/quarterly-goals.pdf",
        },
      ],
      image: "/api/placeholder/1200/400",
    },
  });

  const { setValue, watch } = methods;
  const formValues = watch();
  const participants = watch("participants");
  const files = watch("files");

  const handleAddParticipant = (email: string) => {
    if (!participants.some((p) => p.email === email)) {
      setValue("participants", [...participants, { email }]);
    }
  };

  const handleRemoveParticipant = (email: string) => {
    setValue(
      "participants",
      participants.filter((p) => p.email !== email)
    );
  };

  const handleFileUpload = () => {
    setValue("files", [
      ...files,
      {
        name: "example-document.pdf",
        size: "2.4 MB",
        type: "application/pdf",
        url: "/example-document.pdf",
      },
    ]);
    setShowFileDialog(false);
  };

  const handleRemoveFile = (fileName: string) => {
    setValue(
      "files",
      files.filter((f) => f.name !== fileName)
    );
  };

  const onSubmit = (data: any) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (data.startTime) {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      startDate.setHours(startHours, startMinutes, 0, 0);
    }

    if (data.endTime) {
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      endDate.setHours(endHours, endMinutes, 0, 0);
    }

    const eventData = {
      ...data,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    console.log("Form submitted:", eventData);
  };

  const toggleEditMode = () => {
    console.log("toggleEditMode");
    setIsEditMode(!isEditMode);
  };

  const handleAddFile = (file: any) => {
    setValue("files", [...files, file]);
  };

  const formContent = useMemo(() => {
    if (!isEditMode) {
      return <EventViewMode data={formValues} />;
    } else {
      return (
        <EventFormEditor
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
          onAddParticipant={handleAddParticipant}
          onRemoveParticipant={handleRemoveParticipant}
          participants={participants}
          files={files}
        />
      );
    }
  }, [
    isEditMode,
    formValues,
    participants,
    files,
    methods,
    handleAddParticipant,
    handleRemoveParticipant,
  ]);

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            className={cn("flex flex-col gap-6 max-w-4xl mx-auto", className)}
            {...props}
          >
            <Card>
              <CardHeader className="relative">
                {watch("image") && (
                  <div className="absolute inset-0 w-full h-40 overflow-hidden rounded-t-lg -z-10">
                    <img
                      src={watch("image")}
                      alt="Event cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                  </div>
                )}
                <div className="flex justify-between items-center pt-40">
                  <div>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      {isEditMode
                        ? "Update the details for your event"
                        : "View event information"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleEditMode}>
                    {isEditMode ? "View Mode" : "Edit Mode"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>{formContent}</CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {isEditMode ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={toggleEditMode}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Event</Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleEditMode}
                  >
                    Edit
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
      <AlertDialog open={showFileDialog} onOpenChange={setShowFileDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload File</AlertDialogTitle>
            <AlertDialogDescription>
              Select a file to upload for this event
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Input id="file-upload" type="file" />
            <p className="text-xs text-muted-foreground mt-1">
              Max file size: 10MB
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFileUpload}>
              Upload
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormProvider>
  );
}
