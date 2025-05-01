import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function CalendarHeader({ currentDate }: any) {
  const formatHeader = () => {
    return format(currentDate, "MMMM yyyy", { locale: fr });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xl">{formatHeader()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
