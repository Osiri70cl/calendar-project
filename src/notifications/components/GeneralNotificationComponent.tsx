"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Check, Info, Users, X } from "lucide-react";
import { useState } from "react";

type NotificationType = "event" | "meeting" | "general";

interface Notification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New event: Team building",
    content: "A new team building event has been scheduled for next Friday.",
    timestamp: "2025-04-25T10:00:00",
    type: "event",
    read: false,
  },
  {
    id: "2",
    title: "Meeting rescheduled",
    content: "Your 3pm meeting with Design Team has been moved to 4pm.",
    timestamp: "2025-04-26T14:30:00",
    type: "meeting",
    read: false,
  },
  {
    id: "3",
    title: "Profile updated",
    content: "Your profile information has been successfully updated.",
    timestamp: "2025-04-26T09:15:00",
    type: "general",
    read: true,
  },
  {
    id: "4",
    title: "New event: Product launch",
    content: "The product launch event is scheduled for May 5th.",
    timestamp: "2025-04-24T11:30:00",
    type: "event",
    read: true,
  },
  {
    id: "5",
    title: "Meeting reminder",
    content: "Don't forget your meeting with the marketing team at 2pm today.",
    timestamp: "2025-04-27T08:00:00",
    type: "meeting",
    read: false,
  },
  {
    id: "6",
    title: "System maintenance",
    content: "The system will be under maintenance tonight from 2am to 4am.",
    timestamp: "2025-04-26T16:45:00",
    type: "general",
    read: false,
  },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "event":
        return <Calendar className="h-5 w-5 text-primary" />;
      case "meeting":
        return <Users className="h-5 w-5 text-accent" />;
      case "general":
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg mb-3 transition-colors",
        notification.read
          ? "bg-secondary/30"
          : "bg-secondary border-l-4 border-primary"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-background">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <div className="flex items-center gap-2">
              {!notification.read && (
                <Badge variant="outline" className="bg-primary/10">
                  New
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatDate(notification.timestamp)}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {notification.content}
          </p>
          <div className="flex justify-end gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="h-8 px-2 text-xs"
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(notification.id)}
              className="h-8 px-2 text-xs text-destructive hover:text-destructive/90"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyNotifications = ({ type }: { type: string }) => {
  const getMessage = () => {
    switch (type) {
      case "all":
        return "Auncune notification";
      case "event":
        return "Aucune notification d'événement";
      case "meeting":
        return "Aucune notification de réunion";
      case "general":
        return "Aucune notification générale";
      default:
        return "Aucune notification";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
      <p className="text-muted-foreground text-sm">{getMessage()}</p>
    </div>
  );
};

export function GeneralNotificationComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [showSettings, setShowSettings] = useState(false);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className={cn("flex flex-col w-full h-full", className)} {...props}>
      <div className="h-full flex flex-col border-border rounded-lg bg-background shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Gérez vos notifications et préférences
              </p>
            </div>
            <div className="flex gap-2">
              {notifications.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-xs sm:text-sm"
                  >
                    <Check className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      Tout marquer comme lu
                    </span>
                    <span className="sm:hidden">Marquer lu</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-destructive hover:text-destructive text-xs sm:text-sm"
                  >
                    <X className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Tout effacer</span>
                    <span className="sm:hidden">Effacer</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 flex-1 overflow-hidden">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full h-full flex flex-col"
          >
            <TabsList className="mb-6 grid grid-cols-3 sm:grid-cols-5">
              <TabsTrigger value="all" className="cursor-pointer">
                Tous
              </TabsTrigger>
              <TabsTrigger value="unread" className="cursor-pointer">
                Non lus
              </TabsTrigger>
              <TabsTrigger value="event" className="cursor-pointer sm:block">
                Événements
              </TabsTrigger>
              <TabsTrigger
                value="meeting"
                className="cursor-pointer hidden sm:block"
              >
                Réunions
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="cursor-pointer hidden sm:block"
              >
                Général
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="all" className="mt-0 h-full">
                <div
                  className={cn(
                    "flex flex-col md:flex-row gap-8 h-full",
                    showSettings ? "md:flex-row" : "flex-col"
                  )}
                >
                  <div
                    className={cn(
                      "flex-1 overflow-hidden",
                      showSettings ? "hidden md:block" : "block"
                    )}
                  >
                    <ScrollArea className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={handleMarkAsRead}
                            onDelete={handleDelete}
                          />
                        ))
                      ) : (
                        <EmptyNotifications type="all" />
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="unread" className="mt-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyNotifications type="unread" />
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="event" className="mt-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyNotifications type="event" />
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="meeting" className="mt-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyNotifications type="meeting" />
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="general" className="mt-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)]">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyNotifications type="general" />
                  )}
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
