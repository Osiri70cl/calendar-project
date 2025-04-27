"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Security } from "../security/Security";
import { UserInfo } from "../user-info/UserInfo";

export function GeneralProfilComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [activeTab, setActiveTab] = useState("personal");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userInitials, setUserInitials] = useState("CN");
  const methods = useForm({
    defaultValues: {
      user: {
        firstName: "Remi",
        lastName: "Uxer",
        email: "remi@uxer.fr",
        telephone: "+33612345678",
      },
    },
  });
  const { setValue, watch } = methods;

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <FormProvider {...methods}>
      <div
        className={cn("flex flex-col gap-6 max-w-4xl mx-auto", className)}
        {...props}
      >
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Profil</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles et vos paramètres de compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-4 md:w-1/4 mx-auto md:mx-0">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={avatarUrl || ""} alt="Profile picture" />
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      type="button"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="cursor-pointer"
                    disabled={!avatarUrl}
                    onClick={removeAvatar}
                  >
                    <Trash2 className="h-4 w-4 mr-2 cursor-pointer" />
                    Supprimer
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full">
                <Tabs
                  defaultValue="personal"
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="mb-6">
                    <TabsTrigger className="cursor-pointer" value="personal">
                      Informations personnelles
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="security">
                      Sécurité
                    </TabsTrigger>
                  </TabsList>
                  <UserInfo />
                  <Security />
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
