"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarDays,
  Clock,
  Globe,
  Languages,
  Moon,
  Palette,
  Shield,
  Sun,
} from "lucide-react";
import { useState } from "react";

export function GeneralSettingsComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState("system");
  const [startDay, setStartDay] = useState("monday");
  const [timeFormat, setTimeFormat] = useState("24h");

  return (
    <div className={cn("flex flex-col w-full h-full", className)} {...props}>
      <div className="h-full flex flex-col border-border rounded-lg bg-background shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-border">
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            Réglages
          </h1>
          <p className="text-sm text-muted-foreground">
            Personnalisez votre expérience et définissez vos préférences
          </p>
        </div>
        <div className="p-4 sm:p-6 flex-1 overflow-auto">
          <Tabs
            defaultValue="general"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <TabsList className="flex flex-row sm:flex-col h-auto p-0 bg-transparent sm:w-56 sm:sticky sm:top-0">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <Globe className="h-4 w-4" />
                  <span>Général</span>
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <Palette className="h-4 w-4" />
                  <span>Apparence</span>
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Calendrier</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="language"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <Languages className="h-4 w-4" />
                  <span>Langue</span>
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="w-full justify-start gap-2 px-3 py-2 data-[state=active]:bg-muted"
                >
                  <Shield className="h-4 w-4" />
                  <span>Confidentialité</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1">
                <TabsContent value="general" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres généraux</CardTitle>
                      <CardDescription>
                        Gérez les paramètres de base de votre compte
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Fuseau horaire</h3>
                        <Select defaultValue="Europe/Paris">
                          <SelectTrigger className="w-full sm:w-80">
                            <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Paris">
                              Europe/Paris (GMT+1)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              Europe/London (GMT+0)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              America/New_York (GMT-5)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              America/Los_Angeles (GMT-8)
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">
                              Asia/Tokyo (GMT+9)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Partage de disponibilité
                        </h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="public-calendar">
                                Rendre mon calendrier public
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Permettre aux autres de voir mes disponibilités
                              </p>
                            </div>
                            <Switch id="public-calendar" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="automatic-responses">
                                Réponses automatiques
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Répondre automatiquement aux invitations de
                                réunion
                              </p>
                            </div>
                            <Switch id="automatic-responses" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Session</h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="auto-logout">
                                Déconnexion automatique
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Se déconnecter après une période d'inactivité
                              </p>
                            </div>
                            <Switch id="auto-logout" />
                          </div>

                          <div className="pt-2">
                            <Select defaultValue="60">
                              <SelectTrigger className="w-full sm:w-60">
                                <SelectValue placeholder="Délai de déconnexion" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">
                                  Après 15 minutes
                                </SelectItem>
                                <SelectItem value="30">
                                  Après 30 minutes
                                </SelectItem>
                                <SelectItem value="60">
                                  Après 1 heure
                                </SelectItem>
                                <SelectItem value="120">
                                  Après 2 heures
                                </SelectItem>
                                <SelectItem value="240">
                                  Après 4 heures
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="appearance" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Apparence</CardTitle>
                      <CardDescription>
                        Personnalisez l'apparence de votre application
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Thème</h3>
                        <RadioGroup
                          defaultValue={theme}
                          onValueChange={setTheme}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="light"
                              id="theme-light"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="theme-light"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Sun className="mb-3 h-6 w-6" />
                              <span className="text-sm">Clair</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="dark"
                              id="theme-dark"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="theme-dark"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Moon className="mb-3 h-6 w-6" />
                              <span className="text-sm">Sombre</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="system"
                              id="theme-system"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="theme-system"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <div className="mb-3 h-6 w-6 flex">
                                <Sun className="w-3 h-6" />
                                <Moon className="w-3 h-6" />
                              </div>
                              <span className="text-sm">Système</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Densité de l'affichage
                        </h3>
                        <RadioGroup
                          defaultValue="comfortable"
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="compact"
                              id="density-compact"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="density-compact"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Compact</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="comfortable"
                              id="density-comfortable"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="density-comfortable"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Confortable</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="spacious"
                              id="density-spacious"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="density-spacious"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Spacieux</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="calendar" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres du calendrier</CardTitle>
                      <CardDescription>
                        Configurez vos préférences d'affichage du calendrier
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Affichage par défaut
                        </h3>
                        <RadioGroup
                          defaultValue="week"
                          className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="day"
                              id="view-day"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="view-day"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Journée</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="week"
                              id="view-week"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="view-week"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Semaine</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="month"
                              id="view-month"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="view-month"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Mois</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="agenda"
                              id="view-agenda"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="view-agenda"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Agenda</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Premier jour de la semaine
                        </h3>
                        <RadioGroup
                          defaultValue={startDay}
                          onValueChange={setStartDay}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="monday"
                              id="day-monday"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="day-monday"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Lundi</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="sunday"
                              id="day-sunday"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="day-sunday"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Dimanche</span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="saturday"
                              id="day-saturday"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="day-saturday"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm">Samedi</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Format d'heure</h3>
                        <RadioGroup
                          defaultValue={timeFormat}
                          onValueChange={setTimeFormat}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="12h"
                              id="time-12h"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="time-12h"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Clock className="mb-3 h-6 w-6" />
                              <span className="text-sm">
                                12 heures (1:30 PM)
                              </span>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem
                              value="24h"
                              id="time-24h"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="time-24h"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Clock className="mb-3 h-6 w-6" />
                              <span className="text-sm">24 heures (13:30)</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Durée par défaut des réunions
                        </h3>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-full sm:w-60">
                            <SelectValue placeholder="Durée par défaut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">1 heure</SelectItem>
                            <SelectItem value="90">
                              1 heure 30 minutes
                            </SelectItem>
                            <SelectItem value="120">2 heures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de notifications</CardTitle>
                      <CardDescription>
                        Configurez comment et quand vous souhaitez être notifié
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Canaux de notification
                        </h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-notifications">
                                Notifications par email
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Recevoir des notifications par email
                              </p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-notifications">
                                Notifications push
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Recevoir des notifications dans l'application
                              </p>
                            </div>
                            <Switch id="push-notifications" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="sms-notifications">
                                Notifications SMS
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Recevoir des notifications par SMS
                              </p>
                            </div>
                            <Switch id="sms-notifications" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Rappels de réunion
                        </h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="reminder-enabled">
                                Activer les rappels de réunion
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Recevoir des rappels avant les réunions
                              </p>
                            </div>
                            <Switch id="reminder-enabled" defaultChecked />
                          </div>

                          <div className="pt-2">
                            <h4 className="text-sm">
                              Délai de rappel par défaut
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                              <Select defaultValue="15">
                                <SelectTrigger>
                                  <SelectValue placeholder="Délai de rappel par défaut" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">
                                    5 minutes avant
                                  </SelectItem>
                                  <SelectItem value="10">
                                    10 minutes avant
                                  </SelectItem>
                                  <SelectItem value="15">
                                    15 minutes avant
                                  </SelectItem>
                                  <SelectItem value="30">
                                    30 minutes avant
                                  </SelectItem>
                                  <SelectItem value="60">
                                    1 heure avant
                                  </SelectItem>
                                  <SelectItem value="1440">
                                    1 jour avant
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Types d'événements à notifier
                        </h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="notify-new-invites">
                                Nouvelles invitations
                              </Label>
                            </div>
                            <Switch id="notify-new-invites" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="notify-changes">
                                Changements de réunion
                              </Label>
                            </div>
                            <Switch id="notify-changes" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="notify-cancellations">
                                Annulations
                              </Label>
                            </div>
                            <Switch id="notify-cancellations" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="notify-rsvp">
                                Réponses des participants
                              </Label>
                            </div>
                            <Switch id="notify-rsvp" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="language" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de langue</CardTitle>
                      <CardDescription>
                        Choisissez votre langue et vos préférences régionales
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Langue de l'application
                        </h3>
                        <Select defaultValue="fr">
                          <SelectTrigger className="w-full sm:w-80">
                            <SelectValue placeholder="Sélectionnez une langue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="it">Italiano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
