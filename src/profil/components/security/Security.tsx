import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";

export function Security({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    console.log(data, "in securityt");
  };

  const handleDeleteAccount = () => {
    console.log("delete account");
  };

  return (
    <TabsContent value="security" className="space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Changer le mot de passe</h3>
          <p className="text-sm text-muted-foreground">
            Mettez à jour votre mot de passe pour sécuriser votre compte
          </p>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
              {...register("user.currentPassword", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">Nouveau mot de passe</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              {...register("user.newPassword", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              {...register("user.confirmPassword", { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={handleSubmit(onSubmit)}
          >
            Mettre à jour le mot de passe
          </Button>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <div>
          <h3 className="text-lg font-medium">Suppression du compte</h3>
          <p className="text-sm text-muted-foreground">
            Supprimer définitivement votre compte et toutes vos données
          </p>
        </div>
        <Separator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer">
              Supprimer mon compte
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Elle supprimera définitivement
                votre compte et toutes les données associées de nos serveurs.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                onClick={handleDeleteAccount}
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TabsContent>
  );
}
