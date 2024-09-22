import ProfilComponent from "@/profil/components/profil-component/ProfilComponent";
import { getUserByToken } from "@actions/user";
import { cookies } from "next/headers";

export default async function Profil() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      errors: {
        _form: ["Not authenticated"],
      },
    };
  }

  const user = await getUserByToken(token.value);

  return <ProfilComponent userData={user.user} />;
}
