import { fetchPostSignup } from "@/api/auth/route";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const res = await fetchPostSignup(formData);
    return Response.json({ res });
  } catch (error: any) {
    return new Response(error.message, {
      status: error.status,
    });
  }
}
