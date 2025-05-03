import { fetchPostSignup } from "@/api/auth/route";
import dayjs from "dayjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const res = await fetchPostSignup(formData);
    const expires = dayjs().add(1, "year").toDate();
    (await cookies()).set("tokenCalflow", res.token.token, {
      expires: expires,
    });
    return Response.json({ res });
  } catch (error: any) {
    return new Response(error.message, {
      status: error.status,
    });
  }
}
