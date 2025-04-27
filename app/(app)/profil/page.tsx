import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GeneralProfilComponent } from "@/src/profil/components/general-profil-component/GeneralProfilComponent";
import { Separator } from "@radix-ui/react-separator";

export default function Profile() {
  return (
    <div>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl">Profil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <GeneralProfilComponent />
        </div>
      </div>
    </div>
  );
}
