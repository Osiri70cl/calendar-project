"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useApi, { Methods } from "@/src/global/hooks/useApi";
import Loader from "@/src/icons/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { response, error, loading, callApi } = useApi();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = methods;

  const onSubmit = (data: any) => {
    callApi(Methods.POST, "/api/signup", data);
  };

  useEffect(() => {
    if (response) {
      toast("Connexion réussie", {
        description: "Vous êtes maintenant connecté",
      });
      router.push("/calendrier");
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">S'inscrire</CardTitle>
            <CardDescription>Bienvenue parmis nous !</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    {...register("lastname", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Prénom</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="John"
                    {...register("firstname", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    mot de passe oublié ?
                  </a> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    {...register("password", { required: true })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  onClick={handleSubmit(onSubmit)}
                >
                  {loading ? <Loader /> : "S'inscrire"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Vous avez un compte ?{" "}
                <a href="/connexion" className="underline underline-offset-4">
                  Me connecter
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
