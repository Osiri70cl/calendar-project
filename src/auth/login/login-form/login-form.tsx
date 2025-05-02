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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { response, error, loading, callApi } = useApi();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = methods;

  const onsubmit = (data: any) => {
    callApi(Methods.POST, "/api/login", data);
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
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>Bon retour parmis nous !</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
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
                    Forgot your password?
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
                  onClick={handleSubmit(onsubmit)}
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Connexion"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                Vous n'avez pas encore de compte ?{" "}
                <a href="/inscription" className="underline underline-offset-4">
                  M'inscrire
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
