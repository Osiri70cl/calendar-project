import Menu from "@/global/components/menu/Menu";
import Modal from "@/global/components/modal/Modal.component";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
dayjs.locale("fr");

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/connexion");
  }
  return (
    <>
      <Menu />
      {children}
      <Modal />
    </>
  );
}
