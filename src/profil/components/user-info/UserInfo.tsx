"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";

export function UserInfo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data: any) => {
    console.log("onSubmit called with data:", data);
  };

  return (
    <TabsContent value="personal" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("user.firstName", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("user.lastname", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            readOnly
            placeholder="m@example.com"
            required
            {...register("user.email", { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            {...register("user.telephone")}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          className="bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          Enregistrer les changements
        </Button>
      </div>
    </TabsContent>
  );
}
